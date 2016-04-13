FactoryGirl.define do
  factory :award do
    action { FFaker::LoremCN.sentence }
    association :suggestion

    before(:create) do |award, _evaluator|
      award.holder = award.suggestion.submitter unless award.holder
      award.presenter = create(:user) unless award.presenter
    end
  end
end
