class Suggestion
  include Mongoid::Document
  include Mongoid::Timestamps
  include AASM

  field :title, type: String
  field :content, type: String
  field :state, type: Symbol

  belongs_to :suggestion_type
  belongs_to :submitter, class_name: 'User'

  has_many :reviews
  def reviewers # has_many :reviewers through: :reviews
    User.find(reviews.pluck(:reviewer_id))
  end

  validates :title, presence: true
  validates :content, presence: true
  validates :submitter, presence: true
  validates :suggestion_type, presence: true

  # reject: drafted -> reviewing -> rejected
  # accept: drafted -> reviewing -> accepted -> awarded
  aasm column: :state do
    state :drafted, initial: true
    state :reviewing, :rejected, :accepted, :awarded

    event :submit, &proc { transitions from: :drafted,   to: :reviewing }
    event :reject, &proc { transitions from: :reviewing, to: :rejected  }
    event :accept, &proc { transitions from: :reviewing, to: :accepted  }
    event :award,  &proc { transitions from: :accepted,  to: :awarded   }
  end
end
