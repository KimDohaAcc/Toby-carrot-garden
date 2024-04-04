package garden.carrot.toby.common.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ListDto<T> {

	private List<T> list;
}
