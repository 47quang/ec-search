FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.3
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu && \ 
  /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-phonetic
