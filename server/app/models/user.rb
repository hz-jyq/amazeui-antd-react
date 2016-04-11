class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String
  field :role, type: Symbol, default: :user

  has_and_belongs_to_many :suggestion_types, inverse_of: :reviewers, dependent: :restrict, index: true
  has_many :suggestions, inverse_of: :submitter, dependent: :restrict

  has_many :reviews, inverse_of: :reviewer, dependent: :restrict
  def review_suggestions # has_many :review_suggestions through: :reviews
    Suggestion.where(:id.in => reviews.pluck(:suggestion_id))
  end

  has_many :awards, inverse_of: :holder, dependent: :restrict
  has_many :award_awards, class_name: 'Award', inverse_of: :presenter, dependent: :restrict
  has_many :award_rules, inverse_of: :presenter, dependent: :restrict

  index({ name: 1 }, unique: true)

  validates :name, presence: true, uniqueness: true
  validates :role, inclusion: %i(user manager)

  has_secure_password

  def has_role?(r)
    role == r.to_sym
  end
end
