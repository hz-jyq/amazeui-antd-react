class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String

  has_many :suggestions

  validates :name, presence: true, uniqueness: true

  has_secure_password
end
