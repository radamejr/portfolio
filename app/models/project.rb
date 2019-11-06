class Project < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :utilized, presence: true
  validates :url, presence: true
  validates :git_url, presence: true

  mount_uploader :preview, ThumbnailUploader

  include RankedModel
  ranks :row_order
end
