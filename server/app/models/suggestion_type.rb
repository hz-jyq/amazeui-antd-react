class SuggestionType
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String, default: ''
  field :visibility, type: Symbol, default: :public

  has_many :suggestions, dependent: :restrict
  has_and_belongs_to_many :reviewers, class_name: 'User'

  validates :name, presence: true, uniqueness: true
  validates :visibility, inclusion: %i(public protected)

  def public?
    visibility == :public
  end

  def public=(new_public)
    self.visibility = new_public ? :public : :protected
  end
end
