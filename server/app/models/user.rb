class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String
  field :role, type: Symbol, default: :user

  has_and_belongs_to_many :suggestion_types, dependent: :restrict
  has_many :suggestions, dependent: :restrict

  has_many :reviews, dependent: :restrict
  def review_suggestions # has_many :review_suggestions through: :reviews
    Suggestion.where(:id.in => reviews.pluck(:suggestion_id))
  end

  validates :name, presence: true, uniqueness: true
  validates :role, inclusion: %i(user manager)

  has_secure_password

  def has_role?(r)
    role == r.to_sym
  end
end
