FactoryGirl.define do
  factory :award_rule do
    score_accepted_level 1
    action { FFaker::LoremCN.sentence }
    association :presenter, factory: :user
  end
end
