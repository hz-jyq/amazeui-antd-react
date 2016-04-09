json.(s, :id, :title, :content, :created_at, :state, :score)
json.suggestion_type s.suggestion_type, :id, :name
json.submitter s.submitter, :id, :name
json.reviewers s.reviewers, :id, :name

json.reviews s.reviews do |r|
  json.(r, :id, :score)
  json.reviewer r.reviewer, :id, :name
end
