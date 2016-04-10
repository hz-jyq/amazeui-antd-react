class Suggestion
  include Mongoid::Document
  include Mongoid::Timestamps
  include AASM

  SCORE_MIN_VALUE = 1.0
  SCORE_MAX_VALUE = 5.0
  SCORE_ACCEPTED_VALUE = 3.0
  SCORE_ACCEPTED_LEVEL = {
    1 => Range.new(3.0, 3.5, true), # [3.0, 3.5)
    2 => Range.new(3.5, 4.0, true), # [3.5, 4.0)
    3 => Range.new(4.0, 4.5, true), # [4.0, 4.5)
    4 => Range.new(4.5, 5.0, true), # [4.5, 5.0)
    5 => Range.new(5.0, 5.0)        # [5.0, 5.0]
  }.freeze

  field :title, type: String
  field :content, type: String
  field :state, type: Symbol
  field :score, type: Float

  belongs_to :suggestion_type, inverse_of: :suggestions
  belongs_to :submitter, class_name: 'User', inverse_of: :suggestions

  has_many :reviews, inverse_of: :suggestion, dependent: :destroy
  def reviewers # has_many :reviewers through: :reviews
    User.where(:id.in => reviews.pluck(:reviewer_id))
  end

  has_many :awards, inverse_of: :suggestion

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

  def awarding!
    return unless accepted?
    return unless awards.all?(&:awarded)

    award!
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
