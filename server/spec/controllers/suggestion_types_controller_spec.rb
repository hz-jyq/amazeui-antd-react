RSpec.describe SuggestionTypesController, type: :controller do
  let(:user) { create(:user, role: :manager) }
  before(:each) { authorize(user) }

  describe 'GET /suggestion_types' do
    it 'expected response code 200' do
      create_list(:suggestion_type, 4)
      get '/suggestion_types'
      expect(response_status).to eq(200)
      expect(response_body_as_json.size).to eq(4)
    end
  end

  describe 'POST /suggestion_types' do
    it 'expected response code 201' do
      post '/suggestion_types', suggestion_type: { name: '创新建议', reviewer_ids: [user.id] }
      expect(response_status).to eq(201)

      keys = %w(id name description public reviewers)
      keys.each { |key| expect(response_body_as_json).to have_key(key) }
      expect(response_body_as_json['name']).to eq('创新建议')
      expect(response_body_as_json['reviewers'][0]['name']).to eq(user.name)
    end
  end

  describe 'GET /suggestion_types/:id' do
    it 'expected response code 200' do
      s = create(:suggestion_type)
      get "/suggestion_types/#{s.id}"
      expect(response_status).to eq(200)
    end
  end

  describe 'PUT /suggestion_types/:id' do
    it 'expected response code 200' do
      s = create(:suggestion_type, name: '创新建议')
      put "/suggestion_types/#{s.id}", suggestion_type: { name: '流程管理' }
      expect(response_status).to eq(200)
      expect(response_body_as_json['name']).to eq('流程管理')
    end
  end

  describe 'DELETE /suggestion_types/:id' do
    it 'expected response code 204' do
      s = create(:suggestion_type)
      delete "/suggestion_types/#{s.id}"
      expect(response_status).to eq(204)
    end
  end

  describe 'Access Control' do
    let(:user) { create(:user) }
    before(:each) { authorize(user) }

    it 'expected response code 403 when not granted' do
      post '/suggestion_types'
      expect(response_status).to eq(403)

      s = create(:suggestion_type)
      get "/suggestion_types/#{s.id}"
      expect(response_status).to eq(403)

      s = create(:suggestion_type)
      put "/suggestion_types/#{s.id}"
      expect(response_status).to eq(403)

      s = create(:suggestion_type)
      delete "/suggestion_types/#{s.id}"
      expect(response_status).to eq(403)
    end
  end
end
