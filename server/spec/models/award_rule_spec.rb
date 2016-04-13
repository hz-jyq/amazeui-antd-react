RSpec.describe AwardRule, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:score_accepted_level) }
  it { is_expected.to have_field(:action) }

  it { is_expected.to belong_to(:presenter).of_type(User) }

  it { is_expected.to validate_inclusion_of(:score_accepted_level).to_allow(1, 2, 3, 4, 5) }
  it { is_expected.to validate_presence_of(:action) }
  it { is_expected.to validate_presence_of(:presenter) }
end
