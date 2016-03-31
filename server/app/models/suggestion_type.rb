class SuggestionType
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :visibility, type: Symbol, default: :public

  has_many :suggestions, dependent: :restrict
  has_and_belongs_to_many :reviewers, class_name: 'User'

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :visibility, inclusion: %i(public protected)
end
