class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  field :name, type: String
  field :password_digest, type: String

  validates :name, presence: true, uniqueness: true

  has_secure_password
end
