package com.kirey.kjcore.features.sftp;


/**
 * Message gateway for executing commands
 * @author karadzica
 *
 */
public interface KjcSftpGateway {
	public void ls(String dir);
	public void getFileAsStream(String filename);
}
