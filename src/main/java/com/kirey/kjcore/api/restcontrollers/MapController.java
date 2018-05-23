package com.kirey.kjcore.api.restcontrollers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.geojson.Crs;
import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.geojson.GeometryCollection;
import org.geojson.LngLatAlt;
import org.geojson.MultiPolygon;
import org.geojson.Point;
import org.geojson.Polygon;
import org.geojson.jackson.CrsType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/rest/map", produces = "application/json; charset=UTF-8")
public class MapController {

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<Object> getSerbiaPoint() {

		LngLatAlt belgradeCoordinates = new LngLatAlt(20.4489, 44.7866);
		Point belgradePoint1 = new Point(belgradeCoordinates);
		Map<String, Object> pointProperties = new HashMap<>();
		pointProperties.put("name", "pointProperties");
		pointProperties.put("title", "Belgrade");
		pointProperties.put("description", "Capital city of Serbia");
		pointProperties.put("marker-symbol", "star");
		pointProperties.put("marker-size", "medium");
		pointProperties.put("marker-color", "#f44");

		LngLatAlt polygonCoord1 = new LngLatAlt(20.330840, 44.858874);
		LngLatAlt polygonCoord2 = new LngLatAlt(20.578259, 44.868713);
		LngLatAlt polygonCoord3 = new LngLatAlt(20.451669, 44.702505);

		List<LngLatAlt> polygonCoordinates = new ArrayList<>();
		polygonCoordinates.add(polygonCoord1);
		polygonCoordinates.add(polygonCoord2);
		polygonCoordinates.add(polygonCoord3);
		polygonCoordinates.add(polygonCoord1); // closed exteriorRing

		Polygon polygon = new Polygon(polygonCoordinates);

		FeatureCollection collection = new FeatureCollection();

		Feature feature = new Feature();
		feature.setGeometry(polygon);

		Feature feature1 = new Feature();
		feature1.setGeometry(belgradePoint1);
		feature1.setProperties(pointProperties);

		collection.add(feature);
		collection.add(feature1);

		return new ResponseEntity<Object>(collection, HttpStatus.OK);
	}

	@RequestMapping(value = "/risk", method = RequestMethod.GET)
	public ResponseEntity<Object> getKireyRisk() {

		LngLatAlt dyntechCoordinates = new LngLatAlt(21.899871826171875, 43.319635933695395);
		Point dyntechPoint = new Point(dyntechCoordinates);
		Map<String, Object> dyntechPointProperties = new HashMap<>();
		dyntechPointProperties.put("name", "DynTech");
		dyntechPointProperties.put("marker-color", "#fd0000");
		dyntechPointProperties.put("marker-size", "medium");
		dyntechPointProperties.put("marker-symbol", "building");

		LngLatAlt dyntechPolygonRisk5coo1 = new LngLatAlt(21.89274787902832, 43.32420986214319);
		LngLatAlt dyntechPolygonRisk5coo2 = new LngLatAlt(21.888928413391113, 43.3175283763791);
		LngLatAlt dyntechPolygonRisk5coo3 = new LngLatAlt(21.89588069915771, 43.31746592912132);
		LngLatAlt dyntechPolygonRisk5coo4 = new LngLatAlt(21.905193328857422, 43.31534268417083);
		LngLatAlt dyntechPolygonRisk5coo5 = new LngLatAlt(21.910300254821777, 43.31883975396771);
		LngLatAlt dyntechPolygonRisk5coo6 = new LngLatAlt(21.90669536590576, 43.32430352260899);
		List<LngLatAlt> dyntechPolygonRisk5Coordinates = new ArrayList<>();
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo1);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo2);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo3);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo4);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo5);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo6);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo1);

		Polygon risk5Dyntech = new Polygon(dyntechPolygonRisk5Coordinates);
		Map<String, Object> risk5Properties = new HashMap<>();
		risk5Properties.put("stroke", "#555555");
		risk5Properties.put("stroke-width", 2);
		risk5Properties.put("stroke-opacity", 1);
		risk5Properties.put("fill", "#ff1c1c");
		risk5Properties.put("fill-opacity", 0.5);

		LngLatAlt dyntechPolygonRisk4coo1 = new LngLatAlt(21.891374588012695, 43.325958167027615);
		LngLatAlt dyntechPolygonRisk4coo2 = new LngLatAlt(21.88322067260742, 43.31568615529564);
		LngLatAlt dyntechPolygonRisk4coo3 = new LngLatAlt(21.914119720458984, 43.314593285887106);
		LngLatAlt dyntechPolygonRisk4coo4 = new LngLatAlt(21.91068649291992, 43.326051824797915);
		List<LngLatAlt> dyntechPolygonRisk4Coordinates = new ArrayList<>();
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo1);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo2);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo3);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo4);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo1);

		Polygon risk4Dyntech = new Polygon(dyntechPolygonRisk5Coordinates);
		Map<String, Object> risk4Properties = new HashMap<>();
		risk4Properties.put("stroke", "#000daa");
		risk4Properties.put("stroke-width", 2);
		risk4Properties.put("stroke-opacity", 1);
		risk4Properties.put("fill", "#1e00aa");
		risk4Properties.put("fill-opacity", 0.5);

		LngLatAlt dyntechPolygonRisk3coo1 = new LngLatAlt(21.87978744506836, 43.32911123255536);
		LngLatAlt dyntechPolygonRisk3coo2 = new LngLatAlt(21.85309410095215, 43.33217048621886);
		LngLatAlt dyntechPolygonRisk3coo3 = new LngLatAlt(21.85103416442871, 43.30050912461068);
		LngLatAlt dyntechPolygonRisk3coo4 = new LngLatAlt(21.932058334350582, 43.29182590943353);
		LngLatAlt dyntechPolygonRisk3coo5 = new LngLatAlt(21.91875457763672, 43.33778912211665);
		List<LngLatAlt> dyntechPolygonRisk3Coordinates = new ArrayList<>();
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo1);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo2);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo3);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo4);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo5);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo1);

		Polygon risk3Dyntech = new Polygon(dyntechPolygonRisk5Coordinates);
		Map<String, Object> risk3Properties = new HashMap<>();
		risk3Properties.put("stroke", "#15aa00");
		risk3Properties.put("stroke-width", 2);
		risk3Properties.put("stroke-opacity", 1);
		risk3Properties.put("fill", "#00aa15");
		risk3Properties.put("fill-opacity", 0.5);

		/////////////////// KIREY
		LngLatAlt kireyCoordinates = new LngLatAlt(9.184234, 45.503733);
		Point kireyPoint = new Point(kireyCoordinates);
		Map<String, Object> kireyPointProperties = new HashMap<>();
		kireyPointProperties.put("name", "Kirey");
		kireyPointProperties.put("marker-color", "#fd0000");
		kireyPointProperties.put("marker-size", "medium");
		kireyPointProperties.put("marker-symbol", "building");

		LngLatAlt kireyPolygonRisk4coo1 = new LngLatAlt(9.151268005371094, 45.51693278828882);
		LngLatAlt kireyPolygonRisk4coo2 = new LngLatAlt(9.150238037109375, 45.48420633926945);
		LngLatAlt kireyPolygonRisk4coo3 = new LngLatAlt(9.235897064208984, 45.494435398006495);
		LngLatAlt kireyPolygonRisk4coo4 = new LngLatAlt(9.191093444824219, 45.524630364755225);
		List<LngLatAlt> kireyPolygonRisk4Coordinates = new ArrayList<>();
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo1);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo2);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo3);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo4);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo1);

		Polygon risk4Kirey = new Polygon(kireyPolygonRisk4Coordinates);

		LngLatAlt kireyPolygonRisk3coo1 = new LngLatAlt(9.102859497070312, 45.54218651957441);
		LngLatAlt kireyPolygonRisk3coo2 = new LngLatAlt(9.113845825195312, 45.5027376208097);
		LngLatAlt kireyPolygonRisk3coo3 = new LngLatAlt(9.045524597167969, 45.45940820798084);
		LngLatAlt kireyPolygonRisk3coo4 = new LngLatAlt(9.260101318359375, 45.438212811678675);
		LngLatAlt kireyPolygonRisk3coo5 = new LngLatAlt(9.283447265625, 45.545793269880924);
		List<LngLatAlt> kireyPolygonRisk3Coordinates = new ArrayList<>();
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo1);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo2);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo3);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo4);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo5);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo1);

		Polygon risk3Kirey = new Polygon(kireyPolygonRisk3Coordinates);

		MultiPolygon multiPoligonRisk5 = new MultiPolygon();
		multiPoligonRisk5.add(risk5Dyntech);

		MultiPolygon multiPoligonRisk4 = new MultiPolygon();
		multiPoligonRisk4.add(risk4Dyntech);
		multiPoligonRisk4.add(risk4Kirey);

		MultiPolygon multiPoligonRisk3 = new MultiPolygon();
		multiPoligonRisk3.add(risk3Dyntech);
		multiPoligonRisk3.add(risk3Kirey);

		Feature featureRisk5Dyn = new Feature();
		featureRisk5Dyn.setGeometry(risk5Dyntech);
		featureRisk5Dyn.setProperties(risk5Properties);

		Feature featureRisk4Dyn = new Feature();
		featureRisk4Dyn.setGeometry(risk4Dyntech);
		featureRisk4Dyn.setProperties(risk4Properties);

		Feature featureRisk4Kirey = new Feature();
		featureRisk4Kirey.setGeometry(risk4Kirey);
		featureRisk4Kirey.setProperties(risk4Properties);

		Feature featureRisk3Dyn = new Feature();
		featureRisk3Dyn.setGeometry(risk3Dyntech);
		featureRisk3Dyn.setProperties(risk3Properties);

		Feature featureRisk3Kirey = new Feature();
		featureRisk3Kirey.setGeometry(risk3Kirey);
		featureRisk3Kirey.setProperties(risk3Properties);

		Feature dyntechFeature = new Feature();
		dyntechFeature.setGeometry(dyntechPoint);
		dyntechFeature.setProperties(dyntechPointProperties);

		Feature kireyFeature = new Feature();
		kireyFeature.setGeometry(kireyPoint);
		kireyFeature.setProperties(kireyPointProperties);

		Map<String, Object> centerZoomProperties = new HashMap<>();
		centerZoomProperties.put("centerLng", 44.371);
		centerZoomProperties.put("centerLat", 15.754);
		centerZoomProperties.put("zoom", 6);

		FeatureCollection collection = new FeatureCollection();
		Crs initialProperties = new Crs();
		initialProperties.setProperties(centerZoomProperties);
		collection.setCrs(initialProperties);
		collection.add(featureRisk5Dyn);
		collection.add(featureRisk4Dyn);
		collection.add(featureRisk4Kirey);
		collection.add(featureRisk3Dyn);
		collection.add(featureRisk3Kirey);
		collection.add(dyntechFeature);
		collection.add(kireyFeature);

		return new ResponseEntity<Object>(collection, HttpStatus.OK);
	}

	@RequestMapping(value = "/risk1", method = RequestMethod.GET)
	public ResponseEntity<Object> getKireyRisk1() {

		LngLatAlt dyntechCoordinates = new LngLatAlt(21.899871826171875, 43.319635933695395);
		Point dyntechPoint = new Point(dyntechCoordinates);
		Map<String, Object> dyntechPointProperties = new HashMap<>();
		dyntechPointProperties.put("name", "DynTech");
		dyntechPointProperties.put("marker-color", "#fd0000");
		dyntechPointProperties.put("marker-size", "medium");
		dyntechPointProperties.put("marker-symbol", "building");

		LngLatAlt dyntechPolygonRisk5coo1 = new LngLatAlt(21.89274787902832, 43.32420986214319);
		LngLatAlt dyntechPolygonRisk5coo2 = new LngLatAlt(21.888928413391113, 43.3175283763791);
		LngLatAlt dyntechPolygonRisk5coo3 = new LngLatAlt(21.89588069915771, 43.31746592912132);
		LngLatAlt dyntechPolygonRisk5coo4 = new LngLatAlt(21.905193328857422, 43.31534268417083);
		LngLatAlt dyntechPolygonRisk5coo5 = new LngLatAlt(21.910300254821777, 43.31883975396771);
		LngLatAlt dyntechPolygonRisk5coo6 = new LngLatAlt(21.90669536590576, 43.32430352260899);
		List<LngLatAlt> dyntechPolygonRisk5Coordinates = new ArrayList<>();
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo1);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo2);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo3);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo4);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo5);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo6);
		dyntechPolygonRisk5Coordinates.add(dyntechPolygonRisk5coo1);

		Polygon risk5Dyntech = new Polygon(dyntechPolygonRisk5Coordinates);
		Map<String, Object> risk5Properties = new HashMap<>();
		risk5Properties.put("stroke", "#555555");
		risk5Properties.put("stroke-width", 2);
		risk5Properties.put("stroke-opacity", 1);
		risk5Properties.put("fill", "#ff1c1c");
		risk5Properties.put("fill-opacity", 0.5);

		LngLatAlt dyntechPolygonRisk4coo1 = new LngLatAlt(21.891374588012695, 43.325958167027615);
		LngLatAlt dyntechPolygonRisk4coo2 = new LngLatAlt(21.88322067260742, 43.31568615529564);
		LngLatAlt dyntechPolygonRisk4coo3 = new LngLatAlt(21.914119720458984, 43.314593285887106);
		LngLatAlt dyntechPolygonRisk4coo4 = new LngLatAlt(21.91068649291992, 43.326051824797915);
		List<LngLatAlt> dyntechPolygonRisk4Coordinates = new ArrayList<>();
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo1);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo2);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo3);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo4);
		dyntechPolygonRisk4Coordinates.add(dyntechPolygonRisk4coo1);

		Polygon risk4Dyntech = new Polygon(dyntechPolygonRisk4Coordinates);
		Map<String, Object> risk4Properties = new HashMap<>();
		risk4Properties.put("stroke", "#000daa");
		risk4Properties.put("stroke-width", 2);
		risk4Properties.put("stroke-opacity", 1);
		risk4Properties.put("fill", "#1e00aa");
		risk4Properties.put("fill-opacity", 0.5);

		LngLatAlt dyntechPolygonRisk3coo1 = new LngLatAlt(21.87978744506836, 43.32911123255536);
		LngLatAlt dyntechPolygonRisk3coo2 = new LngLatAlt(21.85309410095215, 43.33217048621886);
		LngLatAlt dyntechPolygonRisk3coo3 = new LngLatAlt(21.85103416442871, 43.30050912461068);
		LngLatAlt dyntechPolygonRisk3coo4 = new LngLatAlt(21.932058334350582, 43.29182590943353);
		LngLatAlt dyntechPolygonRisk3coo5 = new LngLatAlt(21.91875457763672, 43.33778912211665);
		List<LngLatAlt> dyntechPolygonRisk3Coordinates = new ArrayList<>();
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo1);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo2);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo3);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo4);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo5);
		dyntechPolygonRisk3Coordinates.add(dyntechPolygonRisk3coo1);

		Polygon risk3Dyntech = new Polygon(dyntechPolygonRisk3Coordinates);
		Map<String, Object> risk3Properties = new HashMap<>();
		risk3Properties.put("stroke", "#15aa00");
		risk3Properties.put("stroke-width", 2);
		risk3Properties.put("stroke-opacity", 1);
		risk3Properties.put("fill", "#00aa15");
		risk3Properties.put("fill-opacity", 0.5);

		/////////////////// KIREY
		LngLatAlt kireyCoordinates = new LngLatAlt(9.184234, 45.503733);
		Point kireyPoint = new Point(kireyCoordinates);
		Map<String, Object> kireyPointProperties = new HashMap<>();
		kireyPointProperties.put("name", "Kirey");
		kireyPointProperties.put("marker-color", "#fd0000");
		kireyPointProperties.put("marker-size", "medium");
		kireyPointProperties.put("marker-symbol", "building");

		LngLatAlt kireyPolygonRisk4coo1 = new LngLatAlt(9.151268005371094, 45.51693278828882);
		LngLatAlt kireyPolygonRisk4coo2 = new LngLatAlt(9.150238037109375, 45.48420633926945);
		LngLatAlt kireyPolygonRisk4coo3 = new LngLatAlt(9.235897064208984, 45.494435398006495);
		LngLatAlt kireyPolygonRisk4coo4 = new LngLatAlt(9.191093444824219, 45.524630364755225);
		List<LngLatAlt> kireyPolygonRisk4Coordinates = new ArrayList<>();
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo1);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo2);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo3);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo4);
		kireyPolygonRisk4Coordinates.add(kireyPolygonRisk4coo1);

		Polygon risk4Kirey = new Polygon(kireyPolygonRisk4Coordinates);

		LngLatAlt kireyPolygonRisk3coo1 = new LngLatAlt(9.102859497070312, 45.54218651957441);
		LngLatAlt kireyPolygonRisk3coo2 = new LngLatAlt(9.113845825195312, 45.5027376208097);
		LngLatAlt kireyPolygonRisk3coo3 = new LngLatAlt(9.045524597167969, 45.45940820798084);
		LngLatAlt kireyPolygonRisk3coo4 = new LngLatAlt(9.260101318359375, 45.438212811678675);
		LngLatAlt kireyPolygonRisk3coo5 = new LngLatAlt(9.283447265625, 45.545793269880924);
		List<LngLatAlt> kireyPolygonRisk3Coordinates = new ArrayList<>();
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo1);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo2);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo3);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo4);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo5);
		kireyPolygonRisk3Coordinates.add(kireyPolygonRisk3coo1);

		Polygon risk3Kirey = new Polygon(kireyPolygonRisk3Coordinates);

		MultiPolygon multiPoligonRisk5 = new MultiPolygon();
		multiPoligonRisk5.add(risk5Dyntech);

		MultiPolygon multiPoligonRisk4 = new MultiPolygon();
		multiPoligonRisk4.add(risk4Dyntech);
		multiPoligonRisk4.add(risk4Kirey);

		MultiPolygon multiPoligonRisk3 = new MultiPolygon();
		multiPoligonRisk3.add(risk3Dyntech);
		multiPoligonRisk3.add(risk3Kirey);

		Feature featureRisk5 = new Feature();
		featureRisk5.setGeometry(multiPoligonRisk5);
		featureRisk5.setProperties(risk5Properties);
		featureRisk5.setId("risk5");

		Feature featureRisk4 = new Feature();
		featureRisk4.setGeometry(multiPoligonRisk4);
		featureRisk4.setProperties(risk4Properties);
		featureRisk4.setId("risk4");

		Feature featureRisk3 = new Feature();
		featureRisk3.setGeometry(multiPoligonRisk3);
		featureRisk3.setProperties(risk3Properties);
		featureRisk3.setId("risk3");

		Feature dyntechFeature = new Feature();
		dyntechFeature.setGeometry(dyntechPoint);
		dyntechFeature.setProperties(dyntechPointProperties);
		dyntechFeature.setId("dyntechPoint");

		Feature kireyFeature = new Feature();
		kireyFeature.setGeometry(kireyPoint);
		kireyFeature.setProperties(kireyPointProperties);
		kireyFeature.setId("kireyPoint");

		Map<String, Object> centerZoomProperties = new HashMap<>();
		centerZoomProperties.put("centerLng", 44.371);
		centerZoomProperties.put("centerLat", 15.754);
		centerZoomProperties.put("zoom", 6);

		FeatureCollection collection = new FeatureCollection();
		Crs initialProperties = new Crs();
		initialProperties.setProperties(centerZoomProperties);
		collection.setCrs(initialProperties);
		collection.add(featureRisk3);
		collection.add(featureRisk4);
		collection.add(featureRisk5);
		collection.add(dyntechFeature);
		collection.add(kireyFeature);

		// Map<String, Object> legendMap = new HashMap<>();
		// legendMap.put("#ff1c1c", "Risk5");
		// legendMap.put("#1e00aa", "Risk4");
		// legendMap.put("#00aa15", "Risk3");
		//
		// Crs legendProperties = new Crs();
		// legendProperties.setType(CrsType.name);
		// legendProperties.setProperties(legendMap);
		// collection.setCrs(legendProperties);

		return new ResponseEntity<Object>(collection, HttpStatus.OK);
	}

}
