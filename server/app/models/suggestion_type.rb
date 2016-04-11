class SuggestionType
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String, default: ''
  field :visibility, type: Symbol, default: :public

  has_many :suggestions, inverse_of: :suggestion_type, dependent: :restrict
  has_and_belongs_to_many :reviewers, class_name: 'User', inverse_of: :suggestion_types, index: true

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true, allow_blank: true
  validates :visibility, inclusion: %i(public protected)

  before_save :validates_presence_of_reviewers

  def public?
    visibility == :public
  end

  def public=(new_public)
    self.visibility = new_public ? :public : :protected
  end

  private

  def validates_presence_of_reviewers
    return true unless reviewers.empty?

    errors[:reviewers] << %(can't be empty)
    return false
  end
end
