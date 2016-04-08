FactoryGirl.define do
  factory :suggestion do
    title { FFaker::LoremCN.sentence }
    content { FFaker::LoremCN.paragraph }
    association :submitter, factory: :user
    association :suggestion_type

    after(:create, &:submit!)
  end
end
