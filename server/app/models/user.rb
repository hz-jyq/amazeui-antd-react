class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String
  field :role, type: Symbol, default: :user

  has_many :suggestions, dependent: :restrict
  has_and_belongs_to_many :suggestion_types

  validates :name, presence: true, uniqueness: true
  validates :role, inclusion: %i(user manager administrator)

  has_secure_password
end
