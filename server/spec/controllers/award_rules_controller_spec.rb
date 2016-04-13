RSpec.describe AwardRulesController, type: :controller do
  let(:user) { create(:user, role: :manager) }
  before(:each) { authorize(user) }

  describe 'GET /award_rules' do
    it 'expected response code 200' do
      create_list(:award_rule, 4)
      get '/award_rules'
      expect(response_status).to eq(200)
      expect(response_body_as_json.size).to eq(4)
    end
  end

  describe 'POST /award_rules' do
    it 'expected response code 201' do
      post '/award_rules', award_rule: { score_accepted_level: 1, action: '奖励人民币一百元', presenter_id: user.id }
      expect(response_status).to eq(201)

      keys = %w(id score_accepted_level action presenter)
      keys.each { |key| expect(response_body_as_json).to have_key(key) }
      expect(response_body_as_json['score_accepted_level']).to eq(1)
      expect(response_body_as_json['action']).to eq('奖励人民币一百元')
      expect(response_body_as_json['presenter']['name']).to eq(user.name)
    end
  end

  describe 'GET /award_rules/:id' do
    it 'expected response code 200' do
      s = create(:award_rule)
      get "/award_rules/#{s.id}"
      expect(response_status).to eq(200)
    end
  end

  describe 'PUT /award_rules/:id' do
    it 'expected response code 200' do
      s = create(:award_rule)
      put "/award_rules/#{s.id}", award_rule: { action: '获得一只热气球' }
      expect(response_status).to eq(200)
      expect(response_body_as_json['action']).to eq('获得一只热气球')
    end
  end

  describe 'DELETE /award_rules/:id' do
    it 'expected response code 204' do
      s = create(:award_rule)
      delete "/award_rules/#{s.id}"
      expect(response_status).to eq(204)
    end
  end

  describe 'Access Control' do
    let(:user) { create(:user) }
    before(:each) { authorize(user) }

    it 'expected response code 403 when not granted' do
      post '/award_rules'
      expect(response_status).to eq(403)

      s = create(:award_rule)
      get "/award_rules/#{s.id}"
      expect(response_status).to eq(403)

      s = create(:award_rule)
      put "/award_rules/#{s.id}"
      expect(response_status).to eq(403)

      s = create(:award_rule)
      delete "/award_rules/#{s.id}"
      expect(response_status).to eq(403)
    end
  end
end
