json.(s, :id, :name, :description)
json.public s.public?
json.reviewers s.reviewers, :id, :name
