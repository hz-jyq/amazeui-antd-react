class SuggestionTypesController < Sinatra::Base
  include Endpoint

  template :suggestion_type do
    <<-EOT
      json.(s, :id, :name, :description)
      json.public s.public?
      json.reviewers s.reviewers, :id, :name
    EOT
  end

  post '/' do
    authorize! :manager, :administrator

    p = params[:suggestion_type]
    s = SuggestionType.new(p.slice(:name, :description, :public))
    s.reviewers = User.find(p[:reviewers].map(&->(r) { r[:id] }))
    s.save!

    r = jbuilder(:suggestion_type, locals: { s: s })
    halt 201, r
  end

  put '/:id' do
    authorize! :manager, :administrator

    p = params[:suggestion_type]
    s = SuggestionType.find(params[:id])

    s.name = p[:name] if p.key?(:name)
    s.description = p[:description] if p.key?(:description)
    s.public = p[:public] if p.key?(:public)
    s.reviewers = User.find(p[:reviewers].map(&->(r) { r[:id] })) if p.key?(:reviewers)
    s.save!

    r = jbuilder(:suggestion_type, locals: { s: s })
    halt 200, r
  end

  delete '/:id' do
    authorize! :manager, :administrator

    s = SuggestionType.find(params[:id])
    s.destroy!

    r = jbuilder('')
    halt 200, r
  end
end
