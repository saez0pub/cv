all: index
index: 
	asciidoctor -b html5 -a stylesheet=css/cv.css index.adoc
	asciidoctor -r asciidoctor-pdf -b pdf -a stylesheet=css/cv.css -D pdf index.adoc
