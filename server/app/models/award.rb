class Award
  include Mongoid::Document
  include Mongoid::Timestamps

  field :action, type: String
  field :awarded, type: Boolean, default: false

  belongs_to :holder, class_name: 'User', inverse_of: :awards, index: true
  belongs_to :presenter, class_name: 'User', inverse_of: :award_awards, index: true
  belongs_to :suggestion, inverse_of: :awards, index: true

  validates :action, presence: true
  validates :awarded, inclusion: [true, false]
  validates :holder, presence: true
  validates :presenter, presence: true
  validates :suggestion, presence: true
end
