class Suggestion
  include Mongoid::Document
  include Mongoid::Timestamps
  include AASM

  SCORE_MIN_VALUE = 0
  SCORE_MAX_VALUE = 5
  SCORE_ACCEPTED_VALUE = 3

  field :title, type: String
  field :content, type: String
  field :state, type: Symbol
  field :score, type: Float

  belongs_to :suggestion_type
  belongs_to :submitter, class_name: 'User'

  has_many :reviews, dependent: :destroy
  def reviewers # has_many :reviewers through: :reviews
    User.where(:id.in => reviews.pluck(:reviewer_id))
  end

  validates :title, presence: true
  validates :content, presence: true
  validates :submitter, presence: true
  validates :suggestion_type, presence: true
  validates :score, numericality: {
    greater_than_or_equal_to: SCORE_MIN_VALUE,
    less_than_or_equal_to: SCORE_MAX_VALUE
  }, allow_blank: true

  # reject: drafted -> reviewing -> rejected
  # accept: drafted -> reviewing -> accepted -> awarded
  aasm column: :state do
    state :drafted, initial: true
    state :reviewing, :rejected, :accepted, :awarded

    event :submit, &proc { transitions from: :drafted,   to: :reviewing, success: :drafted_2_reviewing_success_hook }
    event :reject, &proc { transitions from: :reviewing, to: :rejected }
    event :accept, &proc { transitions from: :reviewing, to: :accepted,  success: :reviewing_2_accept_success_hook }
    event :award,  &proc { transitions from: :accepted,  to: :awarded }
  end

  def self.publicized
    ids = SuggestionType.where(visibility: :public).pluck(:id)
    where(:suggestion_type_id.in => ids, :state.ne => :drafted)
  end

  def reviewing!
    return unless reviewing?
    return unless reviews.all? { |r| r.score.present? }

    update_attributes!(score: reviews.map(&:score).reduce(&:+).fdiv(reviews.size))
    score >= SCORE_ACCEPTED_VALUE ? accept! : reject!
  end

  private

  def drafted_2_reviewing_success_hook
    s = suggestion_type
    a = s.reviewers.map { |r| { reviewer: r, suggestion: self } }
    reviews.create!(a)
  end

  def reviewing_2_accept_success_hook
    # TODO
  end
end
