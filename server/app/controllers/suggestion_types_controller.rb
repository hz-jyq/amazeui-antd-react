class SuggestionTypesController < Sinatra::Base
  include Endpoint

  get '/' do
    authorize! SuggestionType, :listable?

    r = jbuilder <<-EOT, locals: { c: SuggestionType.all }
      json.array! c do |s|
        json.(s, :id, :name, :description)
        json.public s.public?
        json.reviewer s.reviewers, :id, :name
      end
    EOT
    halt 200, r
  end

  post '/' do
    authorize! SuggestionType, :creatable?

    p = params[:suggestion_type]
    s = SuggestionType.new(p.slice(:name, :description, :public))
    s.reviewers = User.find(p[:reviewer_ids]) if p.key?(:reviewer_ids)
    s.save!

    r = jbuilder(:'suggestion_types/suggestion_type', locals: { s: s })
    halt 201, r
  end

  get '/:id' do
    s = SuggestionType.find(params[:id])
    authorize! s, :readable?

    r = jbuilder(:'suggestion_types/suggestion_type', locals: { s: s })
    halt 200, r
  end

  put '/:id' do
    p = params[:suggestion_type]
    s = SuggestionType.find(params[:id])
    authorize! s, :updatable?

    s.name = p[:name] if p.key?(:name)
    s.description = p[:description] if p.key?(:description)
    s.public = p[:public] if p.key?(:public)
    s.reviewers = User.find(p[:reviewer_ids]) if p.key?(:reviewer_ids)
    s.save!

    r = jbuilder(:'suggestion_types/suggestion_type', locals: { s: s })
    halt 200, r
  end

  delete '/:id' do
    s = SuggestionType.find(params[:id])
    authorize! s, :deletable?

    s.destroy!

    r = jbuilder('')
    halt 204, r
  end
end
