class AwardsController < Sinatra::Base
  include Endpoint

  get '/' do
    authorize! Award, :listable?

    c = case params[:identifier]
        when 'presenter' then current_user.award_awards
        when 'holder'    then current_user.awards
        else Award.none
        end
    c = c.page(params[:page]).per_page(params[:per_page])

    r = jbuilder <<-EOT, locals: { c: c.includes(:holder, :presenter) }
      json.array! c do |s|
        json.(s, :id, :action, :awarded)
        json.holder s.holder, :id, :name
        json.presenter s.presenter, :id, :name
      end
    EOT
    halt 200, r
  end

  put '/:id/awarded' do
    a = Award.find(params[:id])
    authorize! a, :updatable?

    a.awarded = params.fetch(:awarded)
    a.save!
    a.suggestion.awarding!

    r = jbuilder <<-EOT, locals: { a: a }
      json.(a, :id, :awarded)
    EOT
    halt 200, r
  end
end
