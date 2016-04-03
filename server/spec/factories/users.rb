FactoryGirl.define do
  factory :user do
    name do
      loop do
        name = FFaker::NameCN.name
        break name unless User.where(name: name).exists?
      end
    end
    password { SecureRandom.hex }
  end
end
