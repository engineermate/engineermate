<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  
  <xsl:output method="html"/>
  
  <xsl:template match="/">
      <html>
        <head>
          <title>Unit Conversion</title>
        </head>
        <body>
          <h1>Unit Conversion</h1>
          <select>

            <xsl:for-each select="units/category">
              <option>                
                <xsl:value-of select="@CN"/>
              </option>              
            </xsl:for-each> 

          </select>
          <table border="1">
            <tr bgcolor="#9acd32"><th>name</th><th>convert factor</th><th>input value</th><th>results</th></tr>       
              <xsl:for-each select="units/category/factor">              
                <tr>
                  <td><xsl:value-of select="name"/></td>
                  <td id='xsl:value-of select="name"'><xsl:value-of select="value"/></td>
                  <td><input type="text" /></td>
	                <td></td>	
                </tr>
              </xsl:for-each>              
          </table>
       
        </body>
      </html>
    </xsl:template>
</xsl:stylesheet>
