class SuggestionTypesController < Sinatra::Base
  include Endpoint

  before do
    pass if request.safe?
    authorize! :manager, :administrator
  end

  get '/' do
    r = jbuilder %(json.array! SuggestionType.all, partial: 'suggestion_types/suggestion_type', as: :s)
    halt 200, r
  end

  post '/' do
    p = params[:suggestion_type]
    s = SuggestionType.new(p.slice(:name, :description, :public))
    s.reviewers = User.find(p[:reviewers].map(&->(r) { r[:id] }))
    s.save!

    r = jbuilder(:'suggestion_types/_suggestion_type', locals: { s: s })
    halt 201, r
  end

  put '/:id' do
    p = params[:suggestion_type]
    s = SuggestionType.find(params[:id])

    s.name = p[:name] if p.key?(:name)
    s.description = p[:description] if p.key?(:description)
    s.public = p[:public] if p.key?(:public)
    s.reviewers = User.find(p[:reviewers].map(&->(r) { r[:id] })) if p.key?(:reviewers)
    s.save!

    r = jbuilder(:'suggestion_types/_suggestion_type', locals: { s: s })
    halt 200, r
  end

  delete '/:id' do
    s = SuggestionType.find(params[:id])
    s.destroy!

    r = jbuilder('')
    halt 200, r
  end
end
