class SuggestionsController < Sinatra::Base
  include Endpoint

  post '/' do
    p = params[:suggestion]
    s = SuggestionType.find(p[:suggestion_type_id])
    s = current_user.suggestions.create!(p.slice(:title, :content).merge(suggestion_type: s))
    s.submit! if s.drafted?

    r = jbuilder(:'suggestions/_suggestion', locals: { s: s })
    halt 201, r
  end

  get '/:id' do
    s = Suggestion.find(params[:id])
    halt 403, jbuilder(%(json.error 'forbidden')) unless s.public? || s.submitter == current_user || s.reviewers.include?(current_user)

    r = jbuilder(:'suggestions/_suggestion', locals: { s: s })
    halt 200, r
  end
end
