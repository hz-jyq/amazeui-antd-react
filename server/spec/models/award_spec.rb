RSpec.describe Award, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:action) }
  it { is_expected.to have_field(:awarded) }

  it { is_expected.to belong_to(:holder).of_type(User) }
  it { is_expected.to belong_to(:presenter).of_type(User) }
  it { is_expected.to belong_to(:suggestion) }

  it { is_expected.to validate_presence_of(:action) }
  it { is_expected.to validate_inclusion_of(:awarded).to_allow(true, false) }
  it { is_expected.to validate_presence_of(:holder) }
  it { is_expected.to validate_presence_of(:presenter) }
  it { is_expected.to validate_presence_of(:suggestion) }
end
