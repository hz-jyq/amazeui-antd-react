class SuggestionsController < Sinatra::Base
  include Endpoint

  get '/' do
    c = case params[:filter]
        when 'submitter' then current_user.suggestions
        when 'reviewer'  then current_user.review_suggestions
        else Suggestion.publicized
        end
    c = c.page(params[:page]).per_page(params[:per_page])

    r = jbuilder %(json.array! c, partial: 'suggestions/suggestion', as: :s), {}, c: c
    halt 200, r
  end

  post '/' do
    authorize! Suggestion, :creatable?

    p = params[:suggestion]
    s = SuggestionType.find(p[:suggestion_type_id])
    s = current_user.suggestions.create!(p.slice(:title, :content).merge(suggestion_type: s))
    s.submit! if s.drafted?

    r = jbuilder(:'suggestions/_suggestion', locals: { s: s })
    halt 201, r
  end

  get '/:id' do
    s = Suggestion.find(params[:id])
    authorize! s, :readable?

    r = jbuilder(:'suggestions/_suggestion', locals: { s: s })
    halt 200, r
  end
end
