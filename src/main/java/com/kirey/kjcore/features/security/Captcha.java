package com.kirey.kjcore.features.security;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Random;

import javax.imageio.ImageIO;

import com.google.common.hash.Hashing;

public class Captcha implements Comparable<Captcha> {

	private final String hashCode;
	private final String code;
	private final Date issueTime;
	private String ipAddress;
	private final byte[] image;

	
	public Captcha() {
		this.code = this.generateRandomWords();
		this.hashCode = Hashing.sha256().hashString(code, StandardCharsets.UTF_8).toString();
		this.issueTime = new Date();
		this.image = this.generateImage(code);
	}


	public String getHashCode() {
		return hashCode;
	}


	public String getCode() {
		return code;
	}


	public Date getIssueTime() {
		return issueTime;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public byte[] getImage() {
		return image;
	}


	@Override
	public int compareTo(Captcha captcha) {
		return getIssueTime().compareTo(captcha.getIssueTime());
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result + ((hashCode == null) ? 0 : hashCode.hashCode());
		result = prime * result + ((ipAddress == null) ? 0 : ipAddress.hashCode());
		result = prime * result + ((issueTime == null) ? 0 : issueTime.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Captcha other = (Captcha) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (hashCode == null) {
			if (other.hashCode != null)
				return false;
		} else if (!hashCode.equals(other.hashCode))
			return false;
		if (ipAddress == null) {
			if (other.ipAddress != null)
				return false;
		} else if (!ipAddress.equals(other.ipAddress))
			return false;
		if (issueTime == null) {
			if (other.issueTime != null)
				return false;
		} else if (!issueTime.equals(other.issueTime))
			return false;
		return true;
	}
	
	/**
	 * A method that generates random word
	 * 
	 * @return String generated random word
	 */
	public String generateRandomWords() {
		String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfhgjklzxcvbnm1234567890";
		StringBuilder sb = new StringBuilder();
		Random rnd = new Random();
		while (sb.length() < 5) {
			int index = rnd.nextInt(chars.length());
			sb.append(chars.charAt(index));
		}
		return sb.toString();

	}

	/**
	 * A method that generates random color
	 * 
	 * @return Color generated random color
	 */
	public Color getRandomColor() {
		Random rnd = new Random();
		int red = rnd.nextInt(255);
		int green = rnd.nextInt(255);
		int blue = rnd.nextInt(255);
		return new Color(red, green, blue);
	}

	/**
	 * A method that generates random integer
	 * 
	 * @return int generated random width/height
	 */
	public int getRandomWidthHeight() {
		Random rnd = new Random();
		return rnd.nextInt(190);
	}

	/**
	 * A method that generates image using random word, color, width and height
	 * for each letter and returns it as byte array
	 * 
	 * @param text
	 * @return ByteArray that contains generated captcha image
	 */
	public byte[] generateImage(String text) {
		Random rnd = new Random();
		BufferedImage img = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
		Graphics2D g2d = img.createGraphics();

		// set random font
		String[] fontNames = { "Arial Black", "Impact", "Georgia", "Palatino", "Bookman", "Garamond", "Andale Mono" };
		int index = rnd.nextInt(fontNames.length);
		String fontName = fontNames[index];
		Font font = new Font(fontName, Font.PLAIN, 52);
		g2d.setFont(font);
		g2d.setColor(getRandomColor());
		FontMetrics fm = g2d.getFontMetrics();
		int width = fm.stringWidth(text);
		int height = 70;
		g2d.dispose();

		img = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		g2d = img.createGraphics();
		g2d.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
		g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g2d.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
		g2d.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
		g2d.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
		g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2d.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
		g2d.setFont(font);
		fm = g2d.getFontMetrics();

		g2d.setStroke(new BasicStroke(7));
		g2d.setColor(getRandomColor());
		g2d.drawLine(0, 35, width, 35);
		for (int i = 0; i < 15; i++) {
			g2d.setColor(getRandomColor());
			g2d.drawLine(getRandomWidthHeight(), getRandomWidthHeight(), getRandomWidthHeight(), getRandomWidthHeight());
		}
		g2d.drawString(text, 0, fm.getAscent());
		g2d.dispose();
		ByteArrayOutputStream bos = null;
		try {
			bos = new ByteArrayOutputStream();
			ImageIO.write(img, "png", bos);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return bos.toByteArray();
	}

}
