class SuggestionsController < Sinatra::Base
  include Endpoint

  get '/' do
    authorize! Suggestion, :listable?

    c = case params[:identifier]
        when 'submitter' then current_user.suggestions
        when 'reviewer'  then current_user.review_suggestions
        else Suggestion.publicized
        end
    c = c.page(params[:page]).per_page(params[:per_page])

    r = jbuilder <<-EOT, {}, c: c
      json.array! c do |s|
        json.(s, :id, :title, :created_at, :state, :score)
        json.suggestion_type s.suggestion_type, :id, :name
        json.submitter s.submitter, :id, :name
        json.reviewers s.reviewers, :id, :name
      end
    EOT
    halt 200, r
  end

  post '/' do
    authorize! Suggestion, :creatable?

    p = params[:suggestion]
    s = SuggestionType.find(p[:suggestion_type_id])
    s = current_user.suggestions.create!(p.slice(:title, :content).merge(suggestion_type: s))
    s.submit! if s.drafted?

    r = jbuilder(:'suggestions/suggestion', locals: { s: s })
    halt 201, r
  end

  get '/:id' do
    s = Suggestion.find(params[:id])
    authorize! s, :readable?

    r = jbuilder(:'suggestions/suggestion', locals: { s: s })
    halt 200, r
  end
end
