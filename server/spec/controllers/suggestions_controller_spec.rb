RSpec.describe SuggestionsController, type: :controller do
  let(:user) { create(:user) }
  before(:each) { authorize(user) }

  describe 'POST /suggestions' do
    it 'expected response code 201' do
      s = create(:suggestion_type)
      post '/suggestions', suggestion: { suggestion_type_id: s.id, title: 'TITLE', content: 'CONTENT' }
      expect(response_status).to eq(201)

      keys = %w(id title content created_at state suggestion_type submitter reviewers)
      keys.each { |key| expect(response_body_as_json).to have_key(key) }
      expect(response_body_as_json['suggestion_type']['name']).to eq(s.name)
      expect(response_body_as_json['submitter']['name']).to eq(user.name)
    end
  end
end
