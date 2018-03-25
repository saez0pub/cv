all: index
index: 
	asciidoctor -b html5 -a stylesheet=cv.css index.adoc
