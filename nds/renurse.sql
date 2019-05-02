-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2019 at 08:13 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renurse`
--

-- --------------------------------------------------------

--
-- Table structure for table `cfg`
--

CREATE TABLE `cfg` (
  `id` int(11) NOT NULL,
  `Name` text NOT NULL,
  `adminemail` text NOT NULL,
  `version` text NOT NULL,
  `maintenance` int(11) NOT NULL,
  `extra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cfg`
--

INSERT INTO `cfg` (`id`, `Name`, `adminemail`, `version`, `maintenance`, `extra`) VALUES
(1, 'Renurse', 'm.trieling@etz.nl', 'v1.2', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `togroup` int(11) NOT NULL,
  `urlloc` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `type`, `togroup`, `urlloc`, `date`) VALUES
(1, 'logo-ETZ.jpg', 'jpg', 1, 'logo-ETZ.jpg', '2019-02-28 06:35:09'),
(2, 'map1.png', 'png', 1, 'map1.png', '2019-02-28 06:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `wysig`, `active`, `date`) VALUES
(1, 'Groep met bestanden 1', '<p>Deze groep heeft blabla</p>', 1, '2019-02-28 06:34:55');

-- --------------------------------------------------------

--
-- Table structure for table `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `filename` text NOT NULL,
  `inorder` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logos`
--

INSERT INTO `logos` (`id`, `filename`, `inorder`) VALUES
(1, 'f6f5a49235308e1e.jpg', 1),
(2, 'ec6ee9357629c4e6.jpg', 1),
(3, '4f17b1392b51f22d.jpg', 1),
(5, '5b25b69cf269bb03.jpg', 1),
(7, '7c5424db5cf95380.jpg', 1),
(8, '7fd7645f70196fe4.jpg', 1),
(9, 'd8f6bc913e375c45.jpeg', 1),
(11, '7d7b63f04bb8f237.png', 1),
(13, '21706f21705db7d7.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `coverurl` varchar(50) NOT NULL DEFAULT '',
  `wysig` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `name`, `active`, `coverurl`, `wysig`, `date`) VALUES
(1, 'Voorbeeld Publicatie 1', 1, 'eb2e7bdc319ff2a8.jpg', '<p><strong>Gaat over: </strong>Lorum ipsum opvultekst<br /><strong>Te vinden via: <a href=\"http://www.google.nl\" target=\"_blank\" rel=\"noopener\">www.google.nl</a></strong></p>', '2019-02-28 07:31:15'),
(2, 'Voorbeeld 2', 1, '1deeeb8d586c9dc0.jpg', '<p><strong>Gaat over: </strong>Lorum ipsum opvultekst 2<br /><strong>Te vinden via: <a href=\"http://www.google.nl\" target=\"_blank\" rel=\"noopener\">www.google.nl</a></strong></p>', '2019-02-28 07:31:28'),
(3, 'Voorbeeld publicatie 3', 1, '42c8eda1faa250a4.jpg', '<p><strong>Gaat over: </strong>Lorum ipsum opvultekst 3<br /><strong>Te vinden via: <a href=\"http://www.google.nl\" target=\"_blank\" rel=\"noopener\">www.google.nl</a></strong></p>', '2019-02-28 07:31:43');

-- --------------------------------------------------------

--
-- Table structure for table `research`
--

CREATE TABLE `research` (
  `id` int(11) NOT NULL,
  `uname` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `coverurl` varchar(50) NOT NULL DEFAULT '',
  `wysig` text NOT NULL,
  `status` text NOT NULL,
  `initiative` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `research`
--

INSERT INTO `research` (`id`, `uname`, `active`, `coverurl`, `wysig`, `status`, `initiative`, `date`) VALUES
(1, 'Het kennisniveau van verpleegkundigen t.o.v. oudere patienten', 1, 'e702f58031ed9f6d.jpg', '<table><tbody><tr><td width=\"604\"><p>Titel project</p></td></tr><tr><td width=\"604\"><p>Het kennisniveau van verpleegkundigen ten opzichte van oudere pati&euml;nten.</p></td></tr><tr><td width=\"604\"><p>Looptijd (start en einddatum)</p></td></tr><tr><td width=\"604\"><p>De studie is gestart in december 2016 en afgerond in december 2017.</p></td></tr><tr><td width=\"604\"><p>Onderzoeksgroep (namen en ziekenhuizen)</p></td></tr><tr><td width=\"604\"><p>Christel Derks, Elisabeth Tweesteden Ziekenhuis, Tilburg</p><p>Lysette Hakvoort, M&aacute;xima Medisch Centrum, Eindhoven/Veldhoven</p><p>Marjo van den Elsen, Deventer Ziekenhuis, Deventer.</p><p>Mari&euml;lle van Mersbergen, Elisabeth Tweesteden Ziekenhuis, Tilburg</p><p>Onder begeleiding van Dr. Jeroen Dikken Haagse Hogeschool en Prof. Dr. Marieke Schuurmans, Universitair Medisch Centrum Utrecht.</p></td></tr><tr><td width=\"604\"><p>Achtergrond/ aanleiding</p></td></tr><tr><td width=\"604\"><p>In Nederland hebben we te maken met een zogenaamde dubbele vergrijzing (een relatief groot aandeel ouderen in de samenleving en een stijging van de gemiddelde leeftijd). In Nederland is 18 procent van de Nederlandse bevolking 65 jaar of ouder, in 2040 zal dit toegenomen zijn en wordt een percentage van 40% verwacht. Ziekenhuisverpleegkundigen krijgen steeds meer met deze pati&euml;ntengroep te maken. Mede door co morbiditeit en kwetsbaarheid is de kans op complicaties als vallen, delier en ziekenhuisinfecties voor deze pati&euml;ntencategorie hoger, wat ook het ziekenhuis zelf tot een potentieel gevaarlijke plek maakt. Gezien dit gegeven zijn de kennis en vaardigheden van individuele verpleegkundigen erg belangrijk. Eerder onderzoek toont aan dat kennis over de ouderen bij verpleegkundigen te kort schiet. Verpleegkundigen scoren onvoldoende tot gemiddeld op het kennisniveau met betrekking tot fysieke, mentale en sociale aspecten van veroudering.</p></td></tr><tr><td width=\"604\"><p>Doelstelling en vraagstelling</p></td></tr><tr><td width=\"604\"><p>Het doel van dit onderzoek is om inzicht te krijgen in het kennisniveau van verpleegkundigen over oudere pati&euml;nten in Nederlandse ziekenhuizen. Verder wordt onderzocht of kennisniveau geassocieerd is met leeftijd, opleidingsniveau en werkervaring van de verpleegkundigen. Tevens wordt de relatie tussen kennisniveaus, opvattingen en voorkeuren onderzocht.</p></td></tr><tr><td width=\"604\"><p>Onderzoekspopulatie</p></td></tr><tr><td width=\"604\"><p>Verpleegkundigen werkzaam binnen 10 STZ ziekenhuizen in Nederland. Binnen elk ziekenhuis worden big geregistreerde verpleegkundigen op tenminste twee chirurgische en twee beschouwende afdelingen ge&iuml;ncludeerd. Inbegrepen waren reguliere afdelingen, dagbehandeling chirurgie, intensive care, spoedeisende-hulpafdelingen en dialyse afdelingen.</p></td></tr><tr><td width=\"604\"><p>Studie opzet/ onderzoeksdesign</p></td></tr><tr><td width=\"604\"><p>Deze studie is een multicenter onderzoek met een cross sectioneel design. Het kennisniveau van verpleegkundigen werd gemeten met de KOP-Q ( Knowledge about Older Patients Quiz). De KOP-Q bevat 30 onjuist/juist vragen die algemene kennis meten met betrekking tot oudere opgenomen in het ziekenhuis. Omdat kennis mogelijk geassocieerd is met opvattingen en voorkeuren werden enkele aanvullende vragen gesteld aan verpleegkundigen. 1. Met welke pati&euml;ntengroep werk je het liefst; 2.Hoe denk je over de toename van het aantal ouderen in het ziekenhuis; 3.Vind je het moeilijk om voor oudere pati&euml;nten te zorgen. Naast deze extra vragen werden ook een aantal demografische gegevens van verpleegkundigen uitgevraagd zoals leeftijd, opleidingsniveau, werkervaring en het specialisme waarin de verpleegkundigen werken.</p></td></tr><tr><td width=\"604\"><p>Resultaten</p></td></tr><tr><td width=\"604\"><p>In totaal werden er 2902 verpleegkundigen benaderd. 1922 (66.2 %) hebben de vragenlijst ingevuld, waarna 1743 verpleegkundigen de vragenlijst volledige hadden ingevuld en over bleven voor analyse. In totaal scoorde 636 (36%) van de verpleegkundigen lager dan de normgroep en BIG geregistreerde verpleegkundigen. 116 verpleegkundigen hadden het kennisniveau van eerstejaarsstudenten, 520 van de verpleegkundigen scoorden op het niveau van een laatstejaarsstudent, 571 verpleegkundigen hadden het kennisniveau wat verwacht wordt van een big geregistreerde verpleegkundige en 536 verpleegkundigen scoorden op het niveau van een verpleegkundig specialist. Er werd een grote spreiding in kennisniveau waargenomen tussen verpleegkundigen op 80 procent van de afdelingen. Tevens gaf 55% van de verpleegkundigen aan het moeilijk te vinden om voor oudere pati&euml;nten te zorgen en de meesten (77,6%) geven de voorkeur aan pati&euml;nten in de leeftijd van 19-69 jaar. Lagere kennisniveaus werden gevonden bij verpleegkundigen die niet de voorkeur gaven aan oudere pati&euml;nten en die het moeilijk vinden om voor oudere pati&euml;nten te zorgen.</p></td></tr><tr><td width=\"604\"><p>Discussie/ conclusie</p></td></tr><tr><td width=\"604\"><p>Deze studie impliceert dat er een grote diversiteit bestaat aan kennisniveaus tussen verpleegkundigen in Nederland, zelfs tussen verpleegkundigen werkzaam op dezelfde afdeling. Het is daarom van belang dat verpleegkundigen hun kennis regelmatig met collega&rsquo;s delen en een doorlopende leerhouding ontwikkelen. Het aanpakken van de tekortkomingen in de kennis en attitude van verpleegkundigen in educatieve en kwaliteitsverbeteringsprogramma&rsquo;s zou dan ook een prioriteit moeten zijn voor alle professionals, opleidingen en beleidsmakers in de gezondheidszorg zowel lokaal als op nationaal niveau.</p></td></tr><tr><td width=\"604\"><p>Publicaties</p></td></tr><tr><td width=\"604\"><p>&nbsp;</p><p>Zie aangeleverde publicatielijst.</p></td></tr></tbody></table>', 'Afgerond', 'Christel Derks, Elisabeth Tweesteden Ziekenhuis, Tilburg', '2019-02-28 07:23:05'),
(2, 'De ontwikkeling van een leerinterventie voor verpleegkundigen over valpreventiek', 1, 'd851f5153fa61b6d.png', '<table><tbody><tr><td width=\"604\"><p><strong>Titel project</strong></p></td></tr><tr><td width=\"604\"><p>&nbsp;</p><p>De ontwikkeling van een leerinterventie om de kennis, attitude en vaardigheden van verpleegkundigen te verbeteren over vallen en valpreventie bij oudere opgenomen pati&euml;nten in het ziekenhuis.</p></td></tr><tr><td width=\"604\"><p><strong>Looptijd (start en einddatum)</strong></p></td></tr><tr><td width=\"604\"><p>De studie is gestart in december 2018 en loopt t/m juni 2019.</p></td></tr><tr><td width=\"604\"><p><strong>Onderzoeksgroep (namen en ziekenhuizen)</strong></p></td></tr><tr><td width=\"604\"><p>&nbsp;</p><p>Lysette Hakvoort, M&aacute;xima Medisch Centrum, Eindhoven/Veldhoven</p><p>Maaike van der Wel, Franciscus Gasthuis en Vlietland, Rotterdam</p><p>Ralph Vreeswijk, Spaarne Gasthuis, Haarlem</p><p>Christel Derks, Elisabeth Tweesteden Ziekenhuis, Tilburg</p><p>&nbsp;</p><p>Onder begeleiding van Dr. Jeroen Dikken Haagse Hogeschool en Prof. Dr. Marieke Schuurmans, Universitair Medisch Centrum Utrecht.</p></td></tr><tr><td width=\"604\"><p><strong>Achtergrond/ aanleiding</strong></p></td></tr><tr><td width=\"604\"><p>Valincidenten komen geregeld voor bij oudere pati&euml;nten opgenomen in het ziekenhuis. Verpleegkundigen hebben een belangrijke rol bij het voorkomen van deze valincidenten. Uit eerder onderzoek van het RENursE Consortium blijkt echter ook dat verpleegkundigen een negatieve attitude en onvoldoende kennis hebben over oudere pati&euml;nten. Een leerinterventie, die past bij de leerstrategie&euml;n die verpleegkundigen gebruiken, zou het aantal valincidenten kunnen verminderen. Daarnaast kan ook de kennis en attitude van verpleegkundigen hierdoor verbeteren. Het is echter onbekend welke leerinterventies kennis, attitude en vaardigheden van verpleegkundigen verbeteren</p></td></tr><tr><td width=\"604\"><p><strong>Doelstelling en vraagstelling</strong></p></td></tr><tr><td width=\"604\"><p>Het ontwikkelen van een leerinterventie met behulp van de Behavior Change Wheel, om de kennis, attitude en vaardigheden van verpleegkundigen te verbeteren over vallen en valpreventie bij oudere pati&euml;nten opgenomen in het ziekenhuis.</p></td></tr><tr><td width=\"604\"><p><strong>Onderzoekspopulatie</strong></p></td></tr><tr><td width=\"604\"><p>Professionals (verpleegkundigen, managers, onderwijskundigen en experts in de Geriatrie) uit de tien STZ Ziekenhuizen.</p></td></tr><tr><td width=\"604\"><p><strong>Studie opzet/ onderzoeksdesign</strong></p></td></tr><tr><td width=\"604\"><p>Het betreft een algemeen kwalitatief onderzoeksdesign. Deze studie maakt gebruik van de Behavior Change Wheel als model. Dit model bestaat uit 8 stappen. De studie volgt de 8 stappen van het model en maakt gebruik van twee verschillende methodieken. In de stappen 1 t/m 3 en de stappen 5 t/m 8 wordt er gebruik gemaakt van een Delphi design. Experts in de Geriatrie, afdelingshoofden en onderwijskundigen worden ge&iuml;ncludeerd voor de Delphi rondes. In stap 4 worden focusgroepen gehouden met verpleegkundigen</p></td></tr><tr><td width=\"604\"><p><strong>Resultaten</strong></p></td></tr><tr><td width=\"604\"><p>volgt</p></td></tr><tr><td width=\"604\"><p><strong>Discussie/ conclusie</strong></p></td></tr><tr><td width=\"604\"><p>volgt</p><p>&nbsp;</p></td></tr><tr><td width=\"604\"><p><strong>Publicaties</strong></p></td></tr><tr><td width=\"604\"><p>volgt</p><p>&nbsp;</p></td></tr></tbody></table>', 'open', 'Lysette Hakvoort, MÃ¡xima Medisch Centrum, Eindhoven/Veldhoven', '2019-02-28 07:23:27'),
(3, 'Voorbeeld 3', 1, '739af020d1e0ab5a.jpg', '', 'open', 'ETZ, anders', '2019-02-28 07:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `wysig` text NOT NULL,
  `position` int(11) NOT NULL,
  `lastedit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `textblocks`
--

CREATE TABLE `textblocks` (
  `id` int(11) NOT NULL,
  `wysig` text NOT NULL,
  `extra` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textblocks`
--

INSERT INTO `textblocks` (`id`, `wysig`, `extra`, `date`) VALUES
(1, '<p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Door de vergrijzing verandert de </span></span><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">zorg in ziekenhuizen. De pati&euml;nt wordt steeds ouder en de complexiteit van zorg neemt toe. Het overheidsbeleid is erop gericht om de zorg aan ouderen waar mogelijk in de eerstelijn te laten plaatsvinden. </span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Als toch een ziekenhuisopname nodig is dan beoogt RENursE met haar onderzoeksprogramma bij te dragen aan goed gekwalificeerde verpleegkundigen met voldoende kennis, vaardigheden en oog voor de specifieke zorgbehoeften van ouderen. Hierdoor zal de kwaliteit van zorg tijdens een ziekenhuisopname verbeteren en de functionele achteruitgang tijdens een ziekenhuisopname zoveel mogelijk worden voorkomen.</span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Kenmerkend voor RENursE is dat het onderzoek door verpleegkundigen zelf wordt uitgevoerd in samenwerking met Hogescholen en Universiteiten. Verpleegkundigen vormen niet alleen de grootste beroepsgroep in de gezondheidszorg, belangrijker is hun impact op de uitkomsten van zorg, zowel op het niveau van de individuele pati&euml;nt als die van de zorg als geheel. </span></span></p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Het versterken van evidence based verpleegkundige zorgverlening be&iuml;nvloedt niet alleen de uitkomsten voor (oudere) pati&euml;nten in gunstige zin maar heeft tevens een positief effect op de werkbeleving van verpleegkundigen. Door het onderzoek vanuit de praktijk te initi&euml;ren versterkt het gevoel van regie over de eigen praktijkvoering. Daarnaast werkt het zeer stimulerend in de interdisciplinaire samenwerking met medici en paramedici. </span></span></p>', '1', '2019-05-02 08:03:35'),
(2, '<p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">RENursE bestaat uit een stuurgroep, een onderzoeksgroep en een ondersteunende groep. </span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">De stuurgroep bevordert en behartigt de belangen van het samenwerkingsverband. Daarnaast geeft zij richting aan het onderzoeksprogramma en de landelijke communicatie. In de stuurgroep zitten zowel de kartrekkende ziekenhuizen, als Prof. dr. Marieke Schuurmans, hoogleraar Verplegingswetenschap Universiteit Utrecht en dr. Jeroen Dikken, docent Haagse Hogeschool, beide vanwege hun inhoudelijke expertise.</span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">De onderzoeksgroep bestaat uit verpleegkundige onderzoekers die een onderzoeksvraag uitwerken en het onderzoek na goedkeuring door de stuurgroep uitvoeren. De onderzoeksgroep verwerkt de onderzoeksresultaten in publicaties en een onderzoeksrapport. Zij rapporteert aan de stuurgroep en de ondersteunende groep.</span></span></p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">De ondersteunende groep bestaat uit vertegenwoordigers van de deelnemende ziekenhuizen. Zij leveren een bijdrage aan de dataverzameling voor lopende onderzoeksprojecten. Daarnaast worden de resultaten uit de onderzoeksprojecten binnen deze groep besproken en wordt ook richting gegeven aan mogelijkheden voor vervolgonderzoek. </span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Elk onderzoek wordt uitgewerkt door een nieuw in te richten onderzoeksgroep met verpleegkundig onderzoekers uit de participerende ziekenhuizen. Per onderzoek wordt op maat samenwerking gezocht met Hogescholen en/of Universiteiten.</span></span></p>', '1', '2019-05-02 08:03:44'),
(3, '<p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Het doel van het onderzoeksprogramma van RENursE is om de kwaliteit van de verpleegkundige zorg aan ouderen in het ziekenhuis, nu en in de toekomst, te verhogen en te borgen. Om deze kwaliteit te kunnen realiseren is voor verpleegkundigen voldoende kennis en vaardigheden van zorg aan ouderen in ziekenhuizen een randvoorwaarde. </span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Daarom is als eerste onderzoek verricht naar het kennisniveau van verpleegkundigen over oudere pati&euml;nten in Nederlandse ziekenhuizen. Op basis van deze uitkomsten is het onderzoeksprogramma verder ontwikkeld. </span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Het eerste vervolgonderzoek met </span></span><span style=\"color: #000000;\"><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">het</span></span></span><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\"> doel het ontwikkelen van een leerinterventie die kennis, attitude en klinisch handelen gaat verbeteren, is nagenoeg afgerond. Bij dit onderzoek is de focus gelegd op het voorkomen van valincidenten tijdens ziekenhuis opname. Met de leerinterventie zal deze kennis daadwerkelijk worden ge&iuml;mplementeerd in het curriculum en getoetst worden in de praktijk. </span></span><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">Een tweede vervolgonderzoek over dit thema zal in de tweede helft van 2019 worden opgestart.</span></span></p><p>&nbsp;</p><p><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">RENursE richt zich in haar onderzoeksprogramma op praktijkgericht onderzoek, zodat uitkomsten gelijk ge&iuml;mplementeerd kunnen worden in de praktijk. Daarnaast wil zij bijdragen aan d</span></span><span style=\"font-family: Arial, serif;\"><span style=\"font-size: medium;\">e verbinding tussen praktijk, kennisinstituten, onderzoekers &eacute;n beleidsmakers</span></span></p>', '1', '2019-05-02 08:04:01'),
(4, '<div>&nbsp;</div><div><p>2019</p><p style=\"padding-left: 40px;\"><strong>4-6 feb&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Presentatie op Internatinal scientific Nursing and midwifery Congres in Leuven<br /><strong>1 maart</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; vergadering stuurgroep<br /><strong>15 mei</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; groot overleg RENursE<br /><strong>15 mei</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; vergadering stuurgroep<br /><strong>2 oktober</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;vergadering stuurgroep<br /><strong>2 oktober&nbsp;&nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;groot overleg RENursE<br /><strong>7 november&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;vergadering stuurgroep<br /><br /></p><p>&nbsp;</p></div>', '1', '2019-02-28 10:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `pwd` text NOT NULL,
  `secret` text NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1',
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `lastname`, `email`, `pwd`, `secret`, `type`, `active`, `lastlogin`) VALUES
(1, 'Marika', 'Trieling', 'm.trieling@etz.nl', 'goudvis', 'visgoud', 2, 1, '2019-02-28 06:18:22'),
(2, 'Eddie', 'Maas', 'eddie@edease.nl', 'killerinstinct', 'OxC6MIQt1rMwdbGe', 2, 1, '2019-05-02 07:58:14');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_groups`
--

CREATE TABLE `users_to_groups` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `groupsid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_to_groups`
--

INSERT INTO `users_to_groups` (`id`, `userid`, `groupsid`) VALUES
(1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cfg`
--
ALTER TABLE `cfg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `research`
--
ALTER TABLE `research`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `textblocks`
--
ALTER TABLE `textblocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cfg`
--
ALTER TABLE `cfg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `research`
--
ALTER TABLE `research`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
