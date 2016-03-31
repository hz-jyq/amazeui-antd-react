class Suggestion
  include Mongoid::Document
  include Mongoid::Timestamps
  include AASM

  field :title, type: String
  field :content, type: String
  field :aasm_state, type: Symbol

  belongs_to :user
  belongs_to :suggestion_type

  validates :title, presence: true
  validates :content, presence: true

  # reject: drafted => reviewing => rejected
  # accept: drafted => reviewing => accepted => awarded
  aasm column: :aasm_state do
    state :drafted, initial: true
    state :reviewing, :rejected, :accepted, :awarded

    event :submit, {}, &-> { transitions from: :drafted,   to: :reviewing }
    event :reject, {}, &-> { transitions from: :reviewing, to: :rejected  }
    event :accept, {}, &-> { transitions from: :reviewing, to: :accepted  }
    event :award,  {}, &-> { transitions from: :accepted,  to: :awarded   }
  end
end
