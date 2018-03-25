all: index
index: 
	asciidoctor -b html5 -a stylesheet=cv.css index.adoc
	asciidoctor -r asciidoctor-pdf -b pdf -a stylesheet=cv.css index.adoc
