class Suggestion
  include Mongoid::Document
  include Mongoid::Timestamps
  include AASM

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

  scope :publicized, -> { where(:suggestion_type_id.in => SuggestionType.where(visibility: :public).pluck(:id)) }

  # reject: drafted -> reviewing -> rejected
  # accept: drafted -> reviewing -> accepted -> awarded
  aasm column: :state do
    state :drafted, initial: true
    state :reviewing, :rejected, :accepted, :awarded

    event :submit, &proc { transitions from: :drafted,   to: :reviewing, success: :drafted_2_reviewing_success_hook }
    event :reject, &proc { transitions from: :reviewing, to: :rejected  }
    event :accept, &proc { transitions from: :reviewing, to: :accepted  }
    event :award,  &proc { transitions from: :accepted,  to: :awarded   }
  end

  private

  def drafted_2_reviewing_success_hook
    s = suggestion_type
    a = s.reviewers.map { |r| { reviewer: r, suggestion: self } }
    reviews.create!(a)
  end
end
