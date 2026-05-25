// ============================================
// TEXTOS / Texts - EDIT THIS FILE
// ============================================
// Edita los textos aquí directamente.
// Edit texts here directly.

const i18n = {
    es: {
        nav: {
            logo: "NBGD",
            documentation: "Documentación",
            manuscript: "Ver manuscrito",
            objective: "Objetivo",
            howItWorks: "Cómo funciona",
            gettingStarted: "Cómo iniciar la Pipeline",
            concepts: "Conceptos clave",
            faq: "FAQ",
            reference: "Referencia técnica",
            troubleshooting: "Troubleshooting"
        },
        theme: {
            dark: "Modo oscuro",
            light: "Modo claro"
        },
        objective: {
            title: "Objetivo del Proyecto",
            description: "NBGD es una pipeline que automatiza la descarga y el análisis filogenético de genes o productos génicos desde la base de datos de NCBI RefSeq.",
            whatIsPhylogeny: "¿Qué es una pipeline?",
            phylogenyDescription: "En programación una pipeline no es más que una secuencia de procesos conectados entre sí, donde la salida de cada paso es la entrada del siguiente. Esto permite dividir una tarea compleja en pasos más pequeños y modulares, lo que hace que sea más fácil automatizarla.",
            purpose: "¿Para qué sirve NBGD?",
            purposeItems: [
                "Descargar secuencias de genes o productos génicos de un organismo concreto de manera automática y reproducible",
                "Generar alineamientos y árboles filogenéticos a partir de estas secuencias",
                "Explorar la diversidad genética de bacterias, arqueas y/o virus"
            ]
        },
        howItWorks: {
            title: "Cómo Funciona",
            step1Title: "Paso 1: Búsqueda y Extracción de Genes",
            step1Script: "download.py",
            step1Description: "Este script de Python busca los genomas del organismo seleccionado en RefSeq, busca sus archivos .GenBank asociados y extrae las secuencias elegidas por la anotación de los CDS:",
            step1Items: [
                "Según lo que se escoja, descarga la secuencia de nucleótidos o la proteína traducida",
                "Busca coincidencias exactas con los términos exactos dados por el usuario dentro de los siguientes qualifiers de cada CDS: /gene, /gene_synonym, /product, /note",
                "Genera un archivo FASTA con las secuencias extraídas (y opcionalmente uno adicional con códigos para cada secuencia)",
                "Genera un Excel (.xlsx) con metadatos relevantes para el control de calidad (QC)"
            ],
            step2Title: "Paso 2: Alineamiento, Recorte y Árbol Filogenético",
            step2Script: "aln_trim_tree.py",
            step2Description: "Este script procesa las secuencias descargadas en el paso anterior de manera que:",
            step2Items: [
                "Las alinea usando MUSCLE (alineamiento múltiple)",
                "Recorta las regiones de baja calidad usando ClipKIT",
                "Construye un árbol filogenético usando IQ-TREE"
            ],
            toolsIntro: "Este paso usa herramientas externas que deben estar instaladas antes de empezar la pipeline.",
            table: {
                tool: "Herramienta",
                function: "Función",
                windows: "Windows",
                linuxMac: "Linux/macOS",
                muscle: {
                    function: "Alineamiento múltiple de secuencias",
                    windows: "Descargar: <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> y colocarlo en el PATH del sistema (o en la carpeta del proyecto)",
                    linuxMac: "Linux: <code>sudo apt install muscle</code> | macOS: <code>brew install muscle</code>"
                },
                clipkit: {
                    function: "Recorte de alineamientos",
                    windows: "Se instala automáticamente con <code>requirements.txt</code> (ClipKIT)",
                    linuxMac: "Se instala automáticamente con <code>requirements.txt</code> (ClipKIT)"
                },
                iqtree: {
                    function: "Construcción de árboles filogenéticos",
                    windows: "Descargar: <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a> y colocarlo en el PATH del sistema (o en la carpeta del proyecto)",
                    linuxMac: "Linux: <code>sudo apt install iqtree</code> | macOS: <code>brew install iqtree</code>"
                }
            }
        },
        gettingStarted: {
            title: "Cómo iniciar la Pipeline",
            description: "Sigue estos pasos para ejecutar correctamente la pipeline en tu ordenador.",
            step1Title: "Instalar Python",
            step1Desc: "Instala Python desde la web oficial (versión recomendada: 3.12).",
            step1LinkText: "Descargar Python",
            step2Title: "Instalar MUSCLE e IQ-TREE",
            step2Desc: "Necesitas MUSCLE e IQ-TREE para ejecutar el Paso 2 (alineamiento y árbol).<br><br><strong>Windows:</strong> descárgalos desde <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> y <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a>, y colócalos en la carpeta del proyecto o añádelos al PATH del sistema.<br><br><strong>Linux/macOS:</strong> <code>setup.sh</code> intenta instalarlos con apt/brew; si no se instala correctamente, instálalos manualmente (por ejemplo <code>sudo apt install muscle iqtree</code> o <code>brew install muscle iqtree</code>).",
            step3Title: "Abrir la carpeta del proyecto en la terminal",
            step3Desc: "Abre una terminal en la carpeta donde descargaste/clonaste NBGD.",
            terminalMethods: [
                "Windows: click derecho en la carpeta → \"Abrir en Terminal\"",
                "Windows: click en la barra de direcciones → escribir \"cmd\"",
                "Linux/macOS: abrir el Terminal y navegar con <code>cd</code>"
            ],
            step4Title: "Ejecutar el archivo setup",
            step4Code: "# Linux/macOS\nbash ./setup.sh\n\n# Windows (PowerShell)\npowershell -ExecutionPolicy Bypass -File .\\setup.ps1",
            step4Desc: "Estos comandos crean un entorno virtual, instalan dependencias y arrancan la pipeline.",
            step4WhatItDoes: "Qué hace el archivo 'setup' específicamente:",
            setupWhatItDoes: [
                "Crea un entorno virtual local (.venv)",
                "Instala los paquetes Python de requirements.txt",
                "En Linux/macOS: intenta instalar MUSCLE e IQ-TREE (si hay apt o brew)",
                "Inicia el menú de la pipeline (run.py)"
            ],
            step5Title: "Responder a los prompts",
            step5Desc: "Cuando todo acabe de cargarse verás un menú sencillo. Elige si quieres ejecutar el Paso 1, el Paso 2 o ambos, y contesta a las preguntas.",
            afterSetupOptions: [
                "Solo Paso 1 (descargar y extraer secuencias) = 1",
                "Solo Paso 2 (alinear/recortar/árbol) = 2",
                "Paso 1 + Paso 2 (pipeline completa) = 3"
            ],
            step5Prompts: "Se te pedirá: email de NCBI, clave API (opcional), tipo de secuencia, términos de búsqueda y TaxID (recomendado).",
            tip: { title: "Consejo", content: "Obtén una clave API en los ajustes de tu cuenta de NCBI. Es gratuita y permite descargas más rápidas." }
        },
        concepts: {
            title: "Conceptos Clave",
            description: "Glosario de términos importantes para entender mejor la pipeline y el análisis filogenético.",
            refSeq: { title: "RefSeq", description: "Base de datos de referencia de NCBI con secuencias específicamente seleccionadas y de alta calidad. Es el \"estándar oficial\" para análisis genéticos." },
            entrez: { title: "Entrez", description: "Sistema de búsqueda de NCBI que permite acceder programáticamente a sus bases de datos biológicas." },
            taxId: { title: "TaxID", description: "Identificador numérico único para organismos en NCBI. Por ejemplo, <em>Staphylococcus aureus</em> = 1280." },
            cds: { title: "CDS (Coding DNA Sequence)", description: "Secuencia de codificación: la parte del ADN que codifica solamente para una proteína." },
            cli: { title: "Command-Line Interface (CLI)", description: "Interfaz de línea de comandos: una forma de ejecutar programas escribiendo comandos directamente en una terminal." },
            biopython: { title: "Biopython", description: "Librería de Python que permite interactuar con bases de datos biológicos, manipular secuencias de DNA/RNA/Proteinas y hacer análisis biológicos en general." },
            alignment: { title: "Alineamiento", description: "Proceso de organizar secuencias para identificar posiciones homologas (heredadas de un ancestro común). Revela similitudes y diferencias." },
            trimming: { title: "Recorte (Trimming)", description: "Eliminar columnas dudosas o con muchos huecos del alineamiento para mejorar la calidad del árbol filogenético." },
            phylogeneticTree: { title: "Árbol Filogenético", description: "Diagrama que muestra las relaciones evolutivas entre secuencias. Los nodos representan ancestros comunes y las ramas muestran divergencia." },
        },
        faq: {
            title: "Preguntas Frecuentes",
            questions: [
                { question: "¿Qué es NCBI y por qué necesito una cuenta?", answer: "NCBI (National Center for Biotechnology Information) es el repositorio global de información biológica más importante actualmente. Requiere un email para rastrear el uso, evitar abusos de la plataforma y cumplir con sus términos de servicio. Es gratuito y no envía spam." },
                { question: "¿Cómo obtengo el TaxID de un organismo?", answer: "Busca el nombre del organismo en el <a href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi\" target=\"_blank\" rel=\"noopener\">NCBI Taxonomy Browser</a>. El TaxID aparece tanto en la URL (ej: txid1280) como en la propia página del organismo." },
                { question: "¿Cómo debería buscar los genes o productos génicos?", answer: "La pipeline busca coincidencias exactas con los nombres de genes dados, así que la exactitud de la búsqueda dependerá del objetivo y de la consistencia de anotaciones. Prueba primero con nombres cortos y comunes (por ejemplo 16S rRNA, mecA, nuc) y revisa el Excel de QC para validar que lo extraído es lo esperado. Si no obtienes los resultados esperados a la primera, prueba con otros nombres más específicos o más generales del gen." },
                { question: "¿En qué sistemas operativos se puede correr NBGD?", answer: "NBGD funciona en Windows, Linux y macOS. En Windows debes descargar MUSCLE e IQ-TREE y colocarlos en la carpeta del proyecto o en el PATH del sistema. En Linux/macOS, <code>setup.sh</code> intenta instalarlos con apt/brew; si no están disponibles, hay que instalarlos manualmente." },
                { question: "¿Por qué a veces no encuentra el gen/producto?", answer: "La extracción depende de las anotaciones en RefSeq/GenBank. El mismo gen o producto puede estar anotado con nombres distintos. Ajusta los términos (o usa varios separados por comas) y revisa el QC." }
            ]
        },
        reference: {
            title: "Referencia Técnica",
            structureTitle: "Estructura del Proyecto",
            structure: "NBGD/\n├── run.py                          # Menú interactivo (Paso 1/2/ambos)\n├── setup.ps1 / setup.sh            # Crea .venv + instala dependencias\n├── requirements.txt                # Dependencias de Python\n├── command.txt                     # Comandos para iniciar\n├── 1 SEARCH GENES/\n│   └── download.py                 # Paso 1: descarga/extracción\n└── 2 ALN_TRIM_TREE/\n    ├── aln_trim_tree.py            # Paso 2: MUSCLE -> ClipKIT -> IQ-TREE",
            dependenciesTitle: "Dependencias usadas",
            dependencies: ["Biopython - Manipulación de secuencias biológicas", "OpenPyXL - Generación de archivos Excel", "Certifi - Certificados SSL para NCBI", "ClipKIT - Recorte de los alineamientos"],
            externalToolsTitle: "Herramientas Externas",
            externalTools: ["MUSCLE - Alinear secuencias", "IQ-TREE - Construir árboles"],
            
        },
        troubleshooting: {
            title: "Troubleshooting",
            description: "Problemas comunes y soluciones rápidas.",
            items: [
                "<strong>No se encuentra Python:</strong> reinstala Python 3.12 y asegúrate de que está en el PATH del sistema. Lo puedes verificar escribiendo <code>python -V</code> en la terminal.",
                "<strong>Falla SSL/HTTPS al descargar:</strong> recrea el entorno (.venv) y reinstala requirements.txt (asegurándote de que certifi se instala correctamente).",
                "<strong>NCBI va lento:</strong> usa una API key para acelerar el proceso o reduce el número de secuencias a obtener.",
                "<strong>No se encuentran MUSCLE/IQ-TREE (Linux/macOS):</strong> instala con apt/brew o manualmente desde las webs oficiales.",
                "<strong>El gen/producto no aparece:</strong> prueba sinónimos o términos alternativos y revisa los resultados en el Excel de QC.",
                "<strong>No sé abrir la carpeta en terminal:</strong> revisa el paso 2 de 'Cómo iniciar la Pipeline'."
            ]
        },
        footer: { text: "NBGD (NCBI Bacterial Gene Downloader) - Trabajo de Fin de Grado" }
    },
    en: {
        nav: {
            logo: "NBGD",
            documentation: "Documentation",
            manuscript: "View manuscript",
            objective: "Objective",
            howItWorks: "How it works",
            gettingStarted: "How to start",
            concepts: "Key concepts",
            faq: "FAQ",
            reference: "Technical reference",
            troubleshooting: "Troubleshooting"
        },
        theme: { dark: "Dark mode", light: "Light mode" },
        objective: {
            title: "Project Objective",
            description: "NBGD is a pipeline that automates the download and phylogenetic analysis of genes or gene products from the NCBI RefSeq database.",
            whatIsPhylogeny: "What is a pipeline?",
            phylogenyDescription: "In programming, a pipeline is simply a sequence of connected processes where the output of each step becomes the input of the next. This breaks a complex task into smaller, modular steps that are easier to automate.",
            purpose: "What is NBGD for?",
            purposeItems: [
                "Automatically download a set of gene or gene product sequences from a specific organism in a reproducible way",
                "Generate alignments and phylogenetic trees from those sequences",
                "Explore genetic diversity in bacteria, archaea, and/or viruses"
            ]
        },
        howItWorks: {
            title: "How It Works",
            step1Title: "Step 1: Gene Search and Extraction",
            step1Script: "download.py",
            step1Description: "This Python script searches RefSeq genomes for the selected organism, retrieves the associated GenBank records, and extracts the requested sequences from CDS annotations:",
            step1Items: [
                "Depending on your choice, it downloads either the nucleotide sequence or the translated protein",
                "It searches for exact matches of the user-provided terms in the following CDS qualifiers: /gene, /gene_synonym, /product, /note",
                "It generates a FASTA file with the extracted sequences (and optionally an additional one with numeric codes)",
                "It generates an Excel (.xlsx) file with relevant metadata for quality control (QC)"
            ],
            step2Title: "Step 2: Alignment, Trimming, and Phylogenetic Tree",
            step2Script: "aln_trim_tree.py",
            step2Description: "This script processes the sequences downloaded in the previous step and:",
            step2Items: [
                "Aligns them using MUSCLE (multiple sequence alignment)",
                "Trims the low-quality regions using ClipKIT",
                "Builds a phylogenetic tree using IQ-TREE"
            ],
            toolsIntro: "This step uses external tools that must be installed before running the pipeline.",
            table: {
                tool: "Tool",
                function: "Function",
                windows: "Windows",
                linuxMac: "Linux/macOS",
                muscle: {
                    function: "Multiple sequence alignment",
                    windows: "Download: <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> and add it to PATH (or place it in the project folder)",
                    linuxMac: "Linux: <code>sudo apt install muscle</code> | macOS: <code>brew install muscle</code>"
                },
                clipkit: {
                    function: "Alignment trimming",
                    windows: "Installed automatically via <code>requirements.txt</code> (ClipKIT)",
                    linuxMac: "Installed automatically via <code>requirements.txt</code> (ClipKIT)"
                },
                iqtree: {
                    function: "Phylogenetic tree inference",
                    windows: "Download: <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a> and add it to PATH (or place it in the project folder)",
                    linuxMac: "Linux: <code>sudo apt install iqtree</code> | macOS: <code>brew install iqtree</code>"
                }
            }
        },
        gettingStarted: {
            title: "How to Start the Pipeline",
            description: "Follow these steps to properly run the pipeline on your computer.",
            step1Title: "Install Python",
            step1Desc: "Install Python from the official website (recommended version: 3.12).",
            step1LinkText: "Download Python",
            step2Title: "Install MUSCLE and IQ-TREE",
            step2Desc: "You need MUSCLE and IQ-TREE to run Step 2 (alignment and tree).<br><br><strong>Windows:</strong> download them from <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> and <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a>, then place them in the project folder or add them to your system PATH.<br><br><strong>Linux/macOS:</strong> <code>setup.sh</code> attempts to install them via apt/brew; if installation did not work, install them manually (e.g., <code>sudo apt install muscle iqtree</code> or <code>brew install muscle iqtree</code>).",
            step3Title: "Open the project folder in a terminal",
            step3Desc: "Open a terminal in the folder where you downloaded/cloned NBGD.",
            terminalMethods: [
                "Windows: right click the folder → \"Open in Terminal\"",
                "Windows: click the address bar → type \"cmd\"",
                "Linux/macOS: open Terminal and navigate with <code>cd</code>"
            ],
            step4Title: "Run the setup file",
            step4Code: "# Linux/macOS\nbash ./setup.sh\n\n# Windows (PowerShell)\npowershell -ExecutionPolicy Bypass -File .\\setup.ps1",
            step4Desc: "These commands create a virtual environment, install dependencies, and start the pipeline.",
            step4WhatItDoes: "What setup does specifically:",
            setupWhatItDoes: [
                "Creates a local virtual environment (.venv)",
                "Installs Python packages from requirements.txt",
                "On Linux/macOS: attempts to install MUSCLE and IQ-TREE (if apt or brew is available)",
                "Starts the pipeline menu (run.py)"
            ],
            step5Title: "Answer the prompts",
            step5Desc: "At the end you will see a simple menu. Choose whether to run Step 1, Step 2, or both, and answer the questions.",
            afterSetupOptions: [
                "Step 1 only (download and extract sequences) = 1",
                "Step 2 only (align/trim/tree) = 2",
                "Step 1 + Step 2 (full pipeline) = 3"
            ],
            step5Prompts: "You will be asked for: Entrez email, API key (optional), sequence type, search terms, and TaxID (recommended).",
            tip: { title: "Tip", content: "Get an API key from your NCBI account settings. It's free and allows faster downloads." }
        },
        concepts: {
            title: "Key Concepts", description: "Glossary of important terms.",
            refSeq: { title: "RefSeq", description: "NCBI's reference database with curated, high-quality sequences. Its the \"gold-standard\" for genetic analysis." },
            entrez: { title: "Entrez", description: "NCBI's search system for programmatic access to its biological databases ." },
            taxId: { title: "TaxID", description: "Unique numeric identifier for organisms in NCBI. For example, <em>Staphylococcus aureus</em> = 1280." },
            cds: { title: "CDS", description: "Coding sequence: the DNA sequence that encodes only a protein." },
            cli: { title: "Command-Line Interface (CLI)", description: "A way to run programs by typing commands directly in a terminal." },
            biopython: { title: "Biopython", description: "A Python library that let users interact with biological databases, manipulate DNA/RNA/protein sequences and perform biological analyses in general." },
            alignment: { title: "Alignment", description: "The process of organizing sequences to identify homologous positions (inherited from a common ancestor). Reveals both differences and similarities" },
            trimming: { title: "Trimming", description: "Removing low-quality columns from the alignment to better the quality of the final phylogenetic tree." },
            phylogeneticTree: { title: "Phylogenetic Tree", description: "Diagram that show evolutionary relationships between sequences. The nodes represent common ancestors and the branches represent divergences." },
        },
        faq: {
            title: "Frequently Asked Questions",
            questions: [
                { question: "What is NCBI and why do I need an account?", answer: "NCBI (National Center for Biotechnology Information) is one of the most important global repositories of biological information nowadays. The pipeline asks for an email to track usage, prevent abuse of the platform, and comply with NCBI's terms of service. It's free and does not send spam." },
                { question: "How do I get the TaxID of an organism?", answer: "Search for the organism in the <a href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi\" target=\"_blank\" rel=\"noopener\">NCBI Taxonomy Browser</a>. The TaxID appears both in the URL (e.g., txid1280) and on the organism page." },
                { question: "How should I search genes or gene products?", answer: "The pipeline looks for exact matches of the terms you provide, so results depend both on your goal and on annotation consistency. Start with short, common names (e.g., 16S rRNA, mecA) and validate the search using the QC Excel. If you don't get the expected results on the first go, try synonyms or broader/more specific terms." },
                { question: "Which operating systems are supported?", answer: "NBGD runs on Windows, Linux and macOS. On Windows you need to download MUSCLE and IQ-TREE and either place them in the project folder or add them to PATH. On Linux/macOS, <code>setup.sh</code> attempts to install them via apt or brew; if those aren't available, you need to install them manually." },
                { question: "Why does it sometimes fail to find my gene/product?", answer: "Extraction depends on RefSeq/GenBank annotations. The same gene/product may be labeled differently in different accessions. Try multiple terms and verify the QC file." }
            ]
        },
        reference: {
            title: "Technical Reference",
            structureTitle: "Project Structure",
            structure: "NBGD/\n├── run.py                          # Interactive menu (Step 1/2/both)\n├── setup.ps1 / setup.sh            # Creates .venv + installs dependencies\n├── requirements.txt                # Python dependencies\n├── command.txt                     # Commands to start the run\n├── 1 SEARCH GENES/\n│   └── download.py                 # Step 1: download/extraction\n└── 2 ALN_TRIM_TREE/\n    ├── aln_trim_tree.py            # Step 2: MUSCLE -> ClipKIT -> IQ-TREE",
            dependenciesTitle: "Dependencies",
            dependencies: ["Biopython - Biological sequences manipulation", "OpenPyXL - Excel file generation", "Certifi - SSL certificates for NCBI", "ClipKIT - Alignemnt trimming"],
            externalToolsTitle: "External Tools",
            externalTools: ["MUSCLE - Align sequences", "IQ-TREE - Infer phylogenetic trees"]
        },
        troubleshooting: {
            title: "Troubleshooting",
            description: "Common issues and quick fixes.",
            items: [
                "<strong>Python not found:</strong> reinstall Python 3.12 and make sure it's added to PATH. You can verify it by pasting <code>python -V</code> on the terminal.",
                "<strong>SSL/HTTPS download errors:</strong> recreate the environment (.venv) and reinstall requirements.txt (make sure certifi is correctly installed).",
                "<strong>NCBI is slow:</strong> use an API key to speed up downloads or reduce the number of sequences to download.",
                "<strong>MUSCLE/IQ-TREE not found (Linux/macOS):</strong> install via apt/brew or manually from the official sites.",
                "<strong>Gene/product not found:</strong> try synonyms or alternative terms and validate the results in the QC Excel.",
                "<strong>Can't open the project folder in a terminal:</strong> see step 2 under 'How to Start the Pipeline'."
            ]
        },
        footer: { text: "NBGD (NCBI Bacterial Gene Downloader) - Undergraduate Project" }
    },
    ca: {
        nav: {
            logo: "NBGD",
            documentation: "Documentació",
            manuscript: "Veure manuscrit",
            objective: "Objectiu",
            howItWorks: "Com funciona",
            gettingStarted: "Com iniciar",
            concepts: "Conceptes clau",
            faq: "FAQ",
            reference: "Referència tècnica",
            troubleshooting: "Solució de problemes"
        },
        theme: { dark: "Mode fosc", light: "Mode clar" },
        objective: {
            title: "Objectiu del Projecte",
            description: "NBGD és una pipeline que automatitza la descàrrega i l'anàlisi filogenètic de gens o productes gènics des de la base de dades de NCBI RefSeq.",
            whatIsPhylogeny: "Què és una pipeline?",
            phylogenyDescription: "En programació, una pipeline és només una seqüència de processos connectats entre sí, on la sortida de cada pas és l'entrada del següent. Això permet dividir una tasca complexa en passos més petits i modulars, fet que facilita l'automatització.",
            purpose: "Per a què serveix NBGD?",
            purposeItems: [
                "Descarregar automàticament un conjunt de seqüències d'un organisme concret de manera automàtica i reproduïble",
                "Generar alineaments i arbres filogenètics a partir d'aquestes seqüències",
                "Explorar la diversitat genètica de bacteris, arqueus i/o virus"
            ]
        },
        howItWorks: {
            title: "Com Funciona",
            step1Title: "Pas 1: Cerca i Extracció de Gens",
            step1Script: "download.py",
            step1Description: "Aquest script de Python cerca els genomes de l'organisme seleccionat a RefSeq, recupera els arxius .GenBank associats i extreu les seqüències escollides a partir de les anotacions dels CDS:",
            step1Items: [
                "Segons el que es trïi, es descarrega la seqüència de nucleòtids o la proteïna traduïda",
                "Cerca coincidències exactes dels termes donats per l'usuari als següents qualifiers de cada CDS: /gene, /gene_synonym, /product, /note",
                "Genera un fitxer FASTA amb les seqüències extretes (i opcionalment un d'addicional amb codis numèrics per a cada seqüència)",
                "Genera un Excel (.xlsx) amb metadades rellevants per al control de qualitat (QC)"
            ],
            step2Title: "Pas 2: Alineament, Retall i Arbre Filogenètic",
            step2Script: "aln_trim_tree.py",
            step2Description: "Aquest script processa les seqüències descarregades al pas anterior de manera que:",
            step2Items: [
                "Les alinea amb MUSCLE (alineament múltiple)",
                "Retalla les regions de baixa qualitat amb ClipKIT",
                "Construeix un arbre filogenètic amb IQ-TREE"
            ],
            toolsIntro: "Aquest pas utilitza eines externes que han d'estar instal·lades abans d'iniciar la pipeline.",
            table: {
                tool: "Eina",
                function: "Funció",
                windows: "Windows",
                linuxMac: "Linux/macOS",
                muscle: {
                    function: "Alineament múltiple de seqüències",
                    windows: "Descarregar: <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> i afegir-lo al PATH (o posar-lo a la carpeta del projecte)",
                    linuxMac: "Linux: <code>sudo apt install muscle</code> | macOS: <code>brew install muscle</code>"
                },
                clipkit: {
                    function: "Retall d'alineaments",
                    windows: "S'instal·la automàticament amb <code>requirements.txt</code> (ClipKIT)",
                    linuxMac: "S'instal·la automàticament amb <code>requirements.txt</code> (ClipKIT)"
                },
                iqtree: {
                    function: "Construcció d'arbres filogenètics",
                    windows: "Descarregar: <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a> i afegir-lo al PATH (o posar-lo a la carpeta del projecte)",
                    linuxMac: "Linux: <code>sudo apt install iqtree</code> | macOS: <code>brew install iqtree</code>"
                }
            }
        },
        gettingStarted: {
            title: "Com iniciar la Pipeline",
            description: "Segueix aquests passos per executar correctament la pipeline al teu ordinador.",
            step1Title: "Instal·lar Python",
            step1Desc: "Instal·la Python des del web oficial (versió recomanada: 3.12).",
            step1LinkText: "Descarregar Python",
            step2Title: "Instal·lar MUSCLE i IQ-TREE",
            step2Desc: "Necessites MUSCLE i IQ-TREE per executar el Pas 2 (alineament i arbre).<br><br><strong>Windows:</strong> descarrega'ls des de <a href=\"https://www.drive5.com/muscle/\" target=\"_blank\" rel=\"noopener\">MUSCLE</a> i <a href=\"http://www.iqtree.org/#download\" target=\"_blank\" rel=\"noopener\">IQ-TREE</a> i col·loca'ls a la carpeta del projecte o afegeix-los al PATH del sistema.<br><br><strong>Linux/macOS:</strong> <code>setup.sh</code> intenta instal·lar-los amb apt/brew; si no s'ha instal·lat correctament, ho hauràs de fer manualment (per exemple <code>sudo apt install muscle iqtree</code> o <code>brew install muscle iqtree</code>).",
            step3Title: "Obrir la carpeta del projecte a la terminal",
            step3Desc: "Obre una terminal a la carpeta on has descarregat/clonat NBGD.",
            terminalMethods: [
                "Windows: clic dret a la carpeta → \"Obrir a la Terminal\"",
                "Windows: clic a la barra d'adreces → escriure \"cmd\"",
                "Linux/macOS: obrir la Terminal i navegar amb <code>cd</code>"
            ],
            step4Title: "Executar el arxiu setup",
            step4Code: "# Linux/macOS\nbash ./setup.sh\n\n# Windows (PowerShell)\npowershell -ExecutionPolicy Bypass -File .\\setup.ps1",
            step4Desc: "Aquests comandos creen un entorn virtual, instal·len dependències i inicien la pipeline.",
            step4WhatItDoes: "Què fa el setup específicament:",
            setupWhatItDoes: [
                "Crea un entorn virtual local (.venv)",
                "Instal·la els paquets de Python de requirements.txt",
                "A Linux/macOS: intenta instal·lar MUSCLE i IQ-TREE (si hi ha apt o brew)",
                "Inicia el menú de la pipeline (run.py)"
            ],
            step5Title: "Respondre als prompts",
            step5Desc: "Al final veuràs un menú senzill. Tria si vols executar el Pas 1, el Pas 2 o ambdós, i contesta les preguntes.",
            afterSetupOptions: [
                "Només Pas 1 (descarregar i extreure seqüències) = 1",
                "Només Pas 2 (alinear/retallar/arbre) = 2",
                "Pas 1 + Pas 2 (pipeline completa) = 3"
            ],
            step5Prompts: "Se't demanarà: email d'Entrez, clau API (opcional), tipus de seqüència, termes de cerca i TaxID (recomanat).",
            tip: { title: "Consell", content: "Obtén una clau API als ajustaments del teu compte de NCBI. És gratuïta i permet descàrregues més ràpides." }
        },
        concepts: {
            title: "Conceptes Clau", description: "Glossari de termes importants.",
            refSeq: { title: "RefSeq", description: "Base de dades de referència de NCBI amb seqüències específicament seleccionades i de gran qualitat. És \"estándard oficial\" per a anàlisis genètics." },
            entrez: { title: "Entrez", description: "Sistema de cerca de NCBI que permet accedir programàticament a les seves bases de dades biològiques." },
            taxId: { title: "TaxID", description: "Identificador numèric únic per a organismes a NCBI. Per exemple, <em>Staphylococcus aureus</em> = 1280." },
            cds: { title: "CDS", description: "Seqüència de codificació: la part del ADN que codifica únicament per a una proteïna." },
            cli: { title: "Command-Line Interface (CLI)", description: "Interfície de línia d'ordres: una manera d'executar programes escrivint ordres directament a una terminal." },
            biopython: { title: "Biopython", description: "Llibreria de Python que permet interactuar amb bases de dades biològiques, manipular seqüències de DNA/RNA/Proteïnes i fer anàlisis biològics en general ." },
            alignment: { title: "Alineament", description: "Procés d'organitzar seqüències per identificar posicions homòlogues (hertades d'un ancestre comú). Revela similituds i diferències." },
            trimming: { title: "Poda", description: "Eliminar columnes dubtoses o amb molts espais buits del alineament per a millorar la qualitat de l'arbre filogenètic." },
            phylogeneticTree: { title: "Arbre Filogenètic", description: "Diagrama que mostra les relacions evolutives entre seqüències. Els nodes representen els ancestres comuns y les branques mostren divergències." },
        },
        faq: {
            title: "Preguntes Freqüents",
            questions: [
                { question: "Què és NCBI i per què necessito un compte?", answer: "NCBI (National Center for Biotechnology Information) és el repositori globals d'informació biològica més important actualment. La pipeline demana un email per rastrejar l'ús, evitar abusos de la plataforma i complir els termes de servei. És gratuït i no envia spam." },
                { question: "Com obtinc el TaxID d'un organisme?", answer: "Busca l'organisme al <a href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi\" target=\"_blank\" rel=\"noopener\">NCBI Taxonomy Browser</a>. El TaxID surt tant a la URL (per exemple, txid1280) com a la pròpia fitxa de l'organisme." },
                { question: "Com hauria de cercar els gens o productes gènics?", answer: "La pipeline busca coincidències exactes dels noms de gens que li dones, així que la cerca dependrà de l'objectiu i de la consistència de les anotacions. Comença amb noms curts i comuns (per exemple 16S rRNA, mecA) i revisa l'Excel de QC per validar que el que has obtingut és allò esperat. Si no obtens el resultat esperat a la primera, prova sinònims o termes més generals/específics del gen." },
                { question: "En quins sistemes operatius es pot executar NBGD?", answer: "Funciona a Windows, Linux i macOS. A Windows has de descarregar MUSCLE i IQ-TREE i posar-los a la carpeta del projecte o afegir-los al PATH del sistema. A Linux/macOS, <code>setup.sh</code> intenta instal·lar-los amb apt o brew; si no és possible, cal instal·lació manual." },
                { question: "Per què a vegades no troba el gen/producte?", answer: "L'extracció depèn de les anotacions a RefSeq/GenBank. El mateix gen o producte pot aparèixer anotat amb noms diferents. Ajusta els termes (o utilitza varis separats amb comes) i valida el QC." }
            ]
        },
        reference: {
            title: "Referència Tècnica",
            structureTitle: "Estructura del Projecte",
            structure: "NBGD/\n├── run.py                          # Menú interactiu (Pas 1/2/ambdós)\n├── setup.sh / setup.ps1            # Crea .venv + instal·la dependències\n├── requirements.txt                # Dependències de Python\n├── command.txt                     # Comandes d'arrencada\n├── 1 SEARCH GENES/\n│   └── download.py                 # Pas 1: descàrrega/extracció (RefSeq/Entrez)\n└── 2 ALN_TRIM_TREE/\n    ├── aln_trim_tree.py            # Pas 2: MUSCLE -> ClipKIT -> IQ-TREE",
            dependenciesTitle: "Dependències",
            dependencies: ["Biopython - Manipulació de seqüències biològiques", "OpenPyXL - Generació de fitxers Excel", "Certifi - Certificats SSL per a NCBI", "ClipKIT - Retall dels alineaments"],
            externalToolsTitle: "Eines Externes",
            externalTools: ["MUSCLE - Alinear seqüències", "IQ-TREE - Construir arbres filogenètics"]
        },
        troubleshooting: {
            title: "Solució de problemes",
            description: "Problemes habituals i solucions ràpides.",
            items: [
                "<strong>No es troba Python:</strong> reinstal·la Python 3.12 i assegura't que està al PATH del sistema.Ho pots verificar escrivint <code>python -V</code> a la Terminal.",
                "<strong>Errors SSL/HTTPS en descarregar:</strong> recrea l'entorn (.venv) i reinstal·la requirements.txt (assegurant-te que certifi s'instal·la correctament).",
                "<strong>NCBI va lent:</strong> utilitza una clau API per accelerar les descàrregues o redueix el nombre de seqüències a decarregar.",
                "<strong>MUSCLE/IQ-TREE no trobats (Linux/macOS):</strong> instal·la amb apt/brew o manualment des dels webs oficials.",
                "<strong>No es troba el gen/producte:</strong> prova sinònims o termes alternatius i revisa els resultats a l'Excel de QC.",
                "<strong>No sé obrir la carpeta a la terminal:</strong> revisa el pas 2 de 'Com iniciar la Pipeline'."
            ]
        },
        footer: { text: "NBGD (NCBI Bacterial Gene Downloader) - Treball de Fi de Grau" }
    }
};
