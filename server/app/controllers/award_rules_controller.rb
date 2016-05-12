class AwardRulesController < Sinatra::Base
  include Endpoint

  get '/' do
    authorize! AwardRule, :listable?

    r = jbuilder <<-EOT, locals: { c: AwardRule.all.includes(:presenter) }
      json.array! c do |a|
        json.(a, :id, :score_accepted_level, :action)
        json.presenter a.presenter, :id, :name
      end
    EOT
    halt 200, r
  end

  post '/' do
    authorize! AwardRule, :creatable?

    p = params[:award_rule]
    a = AwardRule.new(p.slice(:score_accepted_level, :action))
    a.presenter = User.find(p[:presenter_id]) if p.key?(:presenter_id)
    a.save!

    r = jbuilder(:'award_rules/award_rule', locals: { a: a })
    halt 201, r
  end

  get '/:id' do
    a = AwardRule.find(params[:id])
    authorize! a, :readable?

    r = jbuilder(:'award_rules/award_rule', locals: { a: a })
    halt 200, r
  end

  put '/:id' do
    p = params[:award_rule]
    a = AwardRule.find(params[:id])
    authorize! a, :updatable?

    a.score_accepted_level = p[:score_accepted_level] if p.key?(:score_accepted_level)
    a.action = p[:action] if p.key?(:action)
    a.presenter = User.find(p[:presenter_id]) if p.key?(:presenter_id)
    a.save!

    r = jbuilder(:'award_rules/award_rule', locals: { a: a })
    halt 200, r
  end

  delete '/:id' do
    a = AwardRule.find(params[:id])
    authorize! a, :deletable?

    a.destroy!

    r = jbuilder('')
    halt 204, r
  end
end
