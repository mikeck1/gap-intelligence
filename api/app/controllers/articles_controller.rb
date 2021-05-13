class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :destroy]

  # GET /articles
  def index
    # @articles = 
    @articles = Article.all.order(:pubtime).reverse_order

    render json: @articles
  end

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, status: :created, location: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end
  


# def updateFeed(arr)
#     arr.each {
#     |el|

#     updateOrg(el[:'name'], el[:'link'])
    
#    }
# end

# def updateOrg(name, link) 
#     uri = URI(link)
#     res = Hash.from_xml(Net::HTTP.get_response(uri).body).to_json

#     # puts JSON.parse(res)['rss']['channel']

#     JSON.parse(res)['rss']['channel']['item'].each { 
#         |n| 
#         if n['pubDate'] != nil
#             date_int = DateTime.parse(n['pubDate'] ).strftime("%s").to_i
#             # create articles_url, params: { article: { date: Time.at(date_int).utc, link: n['link'] , newsorg: name, pubtime: DateTime.parse(n['pubDate'] ).strftime("%s").to_i, title: n['title'] } }, as: :json
#             @article = Article.new({ "date": Time.at(date_int).utc, "link": n['link'] , "newsorg": name, "pubtime": DateTime.parse(n['pubDate'] ).strftime("%s").to_i, "title": n['title'] } )

#             if @article.save
#               render json: @article, status: :created, location: @article
#             else
#               render json: @article.errors, status: :unprocessable_entity
#             end
#       end
#         }
    
# end



#   # PATCH/PUT /articles/1
#   def update
#     npr = { 'name': 'NPR', 'link': 'https://feeds.npr.org/1001/rss.xml' }
#     bbc = { 'name': 'BBC', 'link': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml' }
#     nyt = { 'name': 'NYT', 'link': 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' }
#     cnn = { 'name': 'CNN', 'link': 'http://rss.cnn.com/rss/cnn_topstories.rss' }
#     usa = { 'name': 'USAT', 'link': 'http://rssfeeds.usatoday.com/usatoday-NewsTopStories' }
#     newsOrgs = [npr, bbc, nyt, cnn, usa];
#     updateFeed(newsOrgs)
#   end


  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:title, :newsorg, :pubtime, :link, :date)
    end
end
