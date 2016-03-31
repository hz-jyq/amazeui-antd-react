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
    halt 401, jbuilder(%(json.error 'forbidden')) unless [:manager, :administrator].include?(current_user.role)

    p = params[:suggestion_type]
    s = SuggestionType.new(p.slice(:name, :description, :public))
    s.reviewers = User.find(p[:reviewers].map(&->(r) { r[:id] }))
    s.save!

    halt 201, jbuilder(:suggestion_type, locals: { s: s })
  end
end
