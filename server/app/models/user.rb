class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String
  field :role, type: Symbol, default: :user

  has_and_belongs_to_many :suggestion_types
  has_many :suggestions, dependent: :restrict

  has_many :reviews
  def review_suggestions # has_many :review_suggestions through: :reviews
    Suggestion.find(reviews.pluck(:suggestion_id))
  end

  validates :name, presence: true, uniqueness: true
  validates :role, inclusion: %i(user manager)

  has_secure_password
end
