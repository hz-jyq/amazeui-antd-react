class AwardPolicy
  def initialize(user, record)
    @user = user
    @record = record
  end

  def listable?
    true
  end
end
