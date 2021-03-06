RSpec.describe Suggestion, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:title) }
  it { is_expected.to have_field(:content) }

  it { is_expected.to belong_to(:suggestion_type) }
  it { is_expected.to belong_to(:submitter).of_type(User) }
  it { is_expected.to have_many(:reviews) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:content) }
  it { is_expected.to validate_presence_of(:submitter) }
  it { is_expected.to validate_presence_of(:suggestion_type) }
end
