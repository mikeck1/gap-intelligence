require 'uri'
require 'net/http'
require 'json'
require 'active_support/core_ext/hash'
require "date"


npr = { 'name': 'NPR', 'link': 'https://feeds.npr.org/1001/rss.xml' }
bbc = { 'name': 'BBC', 'link': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml' }
nyt = { 'name': 'NYT', 'link': 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' }
cnn = { 'name': 'CNN', 'link': 'http://rss.cnn.com/rss/cnn_topstories.rss' }
usa = { 'name': 'USAT', 'link': 'http://rssfeeds.usatoday.com/usatoday-NewsTopStories' }
newsOrgs = [npr, bbc, nyt, cnn, usa];

def updateFeed(arr)
    arr.each {
    |el|

    updateOrg(el[:'name'], el[:'link'])
    
   }
end

def updateOrg(name, link) 
    uri = URI(link)
    res = Hash.from_xml(Net::HTTP.get_response(uri).body).to_json

    # puts JSON.parse(res)['rss']['channel']

    JSON.parse(res)['rss']['channel']['item'].each { 
        |n| 
        if n['pubDate'] != nil
            puts n['title']
            puts n['link'] 
            date_int = DateTime.parse(n['pubDate'] ).strftime("%s").to_i
            puts date_int
            puts Time.at(date_int).utc
            puts name
        end
        
        # puts DateTime.strftime("%s")
    }
end
updateFeed(newsOrgs)








# uri = URI('https://feeds.npr.org/1001/rss.xml')
# res = Hash.from_xml(Net::HTTP.get_response(uri).body).to_json

# # puts JSON.parse(res)['rss']['channel']

# JSON.parse(res)['rss']['channel']['item'].each { 
#     |n| 
#     puts n['title']
#     puts n['link'] 
#     date_int = DateTime.parse(n['pubDate'] ).strftime("%s").to_i
#     puts date_int
#     puts Time.at(date_int).utc
#     # puts DateTime.strftime("%s")
# }
# puts res.body if res.is_a?(Net::HTTPSuccess)

