FactoryGirl.define do
  factory :suggestion do
    title { FFaker::LoremCN.sentence }
    content { FFaker::LoremCN.paragraph }
    association :user
    association :suggestion_type
  end
end
