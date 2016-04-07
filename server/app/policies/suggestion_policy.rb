class SuggestionPolicy
  def initialize(user, record)
    @user = user
    @record = record
  end

  def creatable?
    true
  end

  def readable?
    return true if @record.public?
    return @record.submitter == @user || @record.reviewers.include?(@user)
  end
end