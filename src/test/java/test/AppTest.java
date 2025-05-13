package test;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AppTest {

    @Test
    void simpleTest() {
        assertEquals(4, 2 + 2);
    }

    @Test
    void stringTest() {
        String note = "Test note";
        assertTrue(note.contains("Test"));
    }
}
