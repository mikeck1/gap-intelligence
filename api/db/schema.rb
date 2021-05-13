# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_13_033203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title" , null: false
    t.string "newsorg"
    t.string "pubtime"
    t.string "link"
    t.string "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["title"], name: "articles_title_key", unique: true
  end

  create_table "testtable1", id: :serial, force: :cascade do |t|
    t.string "first", limit: 100
    t.string "last", limit: 100
    t.text "email", null: false
    t.string "phone", limit: 100
    t.string "location", limit: 100
    t.string "hobby", limit: 100
    t.datetime "added", null: false
    t.index ["email"], name: "testtable1_email_key", unique: true
  end

  create_table "testtable2", id: :serial, force: :cascade do |t|
    t.string "title", limit: 300, null: false
    t.string "newsorg", limit: 4
    t.bigint "pubtime"
    t.string "body", limit: 1000
    t.string "link", limit: 200
    t.string "date", limit: 35
    t.datetime "added", null: false
    t.index ["title"], name: "testtable2_title_key", unique: true
  end

end
